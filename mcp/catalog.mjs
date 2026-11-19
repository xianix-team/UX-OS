import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, readdir, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { nodeSkillFiles } from '@modelcontextprotocol/server/ext/skills/node';

function resolvePluginRoot() {
  const repoPlugin = fileURLToPath(new URL('../plugin/', import.meta.url));
  if (existsSync(path.join(repoPlugin, 'skills'))) return repoPlugin;
  const bundled = fileURLToPath(new URL('./plugin/', import.meta.url));
  if (existsSync(path.join(bundled, 'skills'))) return bundled;
  throw new Error('uxos plugin skills were not found. Run npm pack from mcp/ so plugin/ is bundled.');
}

const PLUGIN_ROOT = resolvePluginRoot();
export const SKILLS_ROOT = path.join(PLUGIN_ROOT, 'skills');
export const AGENTS_ROOT = path.join(PLUGIN_ROOT, 'agents');
export const TEMPLATES_ROOT = path.join(PLUGIN_ROOT, 'templates');
export const COMMANDS_ROOT = path.join(PLUGIN_ROOT, 'commands');
const METHOD_PATH = path.join(PLUGIN_ROOT, 'METHOD.md');
const PLUGIN_JSON = path.join(PLUGIN_ROOT, '.claude-plugin', 'plugin.json');

const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TEMPLATE_FILE = /^[a-z0-9][a-z0-9-]*\.md$/;
const TEMPLATE_REF = /\$\{CLAUDE_PLUGIN_ROOT\}\/templates\/([a-z0-9][a-z0-9-]*\.md)/g;

export class CatalogError extends Error {
  /**
   * @param {string} message
   * @param {'not_found' | 'invalid_name'} code
   */
  constructor(message, code) {
    super(message);
    this.name = 'CatalogError';
    this.code = code;
  }
}

export function skillUri(name) {
  return `skill://uxos/${name}/SKILL.md`;
}

export function templateUri(filename) {
  return `uxos://template/${filename}`;
}

export const METHOD_URI = 'uxos://method';

function yamlScalar(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  if (trimmed.length >= 2 && trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

/**
 * @param {string} markdown
 * @returns {{ data: Record<string, string>, body: string }}
 */
export function parseFrontmatter(markdown) {
  if (!markdown.startsWith('---\n')) return { data: {}, body: markdown };
  const end = markdown.indexOf('\n---\n', 4);
  if (end === -1) return { data: {}, body: markdown };
  const data = {};
  let key = '';
  let lines = [];
  const flush = () => {
    if (!key) return;
    data[key] = yamlScalar(lines.join('\n').trim());
    key = '';
    lines = [];
  };
  for (const line of markdown.slice(4, end).split('\n')) {
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (match && !/^\s/.test(line)) {
      flush();
      key = match[1];
      lines = [match[2]];
    } else if (key) {
      lines.push(line);
    }
  }
  flush();
  return { data, body: markdown.slice(end + 5) };
}

async function insideRoot(root, candidate) {
  const resolvedRoot = await realpath(root);
  let resolved;
  try {
    resolved = await realpath(candidate);
  } catch {
    throw new CatalogError(`${path.basename(candidate)} was not found`, 'not_found');
  }
  if (resolved !== resolvedRoot && !resolved.startsWith(resolvedRoot + path.sep)) {
    throw new CatalogError('path is outside the plugin directory', 'invalid_name');
  }
  return resolved;
}

function assertSkillName(name) {
  if (typeof name !== 'string' || !SKILL_NAME.test(name)) {
    throw new CatalogError(
      'Skill name must be a kebab-case identifier such as analyse-domain.',
      'invalid_name'
    );
  }
}

function templateFilename(name) {
  const filename = name.endsWith('.md') ? name : `${name}.md`;
  if (!TEMPLATE_FILE.test(filename)) {
    throw new CatalogError(
      'Template name must be a kebab-case filename such as domain.md.',
      'invalid_name'
    );
  }
  return filename;
}

/**
 * @returns {Promise<string>}
 */
export async function pluginVersion() {
  try {
    const json = JSON.parse(await readFile(PLUGIN_JSON, 'utf8'));
    return typeof json.version === 'string' ? json.version : '0.0.0';
  } catch {
    return '0.0.0';
  }
}

/**
 * Skills in plugin/skills plus the two procedures published as agents.
 * @returns {Promise<Array<{ name: string, description: string, uri: string, kind: 'skill' | 'agent', tools?: string }>>}
 */
export async function listSkills() {
  const entries = await readdir(SKILLS_ROOT, { withFileTypes: true });
  const skills = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || !SKILL_NAME.test(entry.name)) continue;
    const raw = await readFile(path.join(SKILLS_ROOT, entry.name, 'SKILL.md'), 'utf8');
    const { data } = parseFrontmatter(raw);
    skills.push({
      name: entry.name,
      description: data.description || data.name || entry.name,
      uri: skillUri(entry.name),
      kind: 'skill',
    });
  }
  const agents = await readdir(AGENTS_ROOT, { withFileTypes: true });
  for (const entry of agents) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const name = entry.name.slice(0, -3);
    if (!SKILL_NAME.test(name)) continue;
    const raw = await readFile(path.join(AGENTS_ROOT, entry.name), 'utf8');
    const { data } = parseFrontmatter(raw);
    skills.push({
      name,
      description: data.description || data.name || name,
      uri: skillUri(name),
      kind: 'agent',
      tools: data.tools || '',
    });
  }
  skills.sort((a, b) => a.name.localeCompare(b.name));
  return skills;
}

/**
 * plugin/skills folders, with each plugin/agents file presented as `<name>/SKILL.md`.
 * One catalog, so skills/list includes the agents the plugin does not put under skills/.
 */
export function pluginSkillFiles() {
  const skills = nodeSkillFiles(SKILLS_ROOT);
  let agentNames;
  const agents = async () => {
    if (agentNames) return agentNames;
    const entries = await readdir(AGENTS_ROOT, { withFileTypes: true });
    agentNames = new Set(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
        .map((entry) => entry.name.slice(0, -3))
        .filter((name) => SKILL_NAME.test(name))
    );
    return agentNames;
  };
  return {
    async list(dir) {
      const names = await agents();
      if (dir === '') {
        const entries = await skills.list('');
        for (const name of names) entries.push({ name, kind: 'directory' });
        return entries;
      }
      if (names.has(dir)) return [{ name: 'SKILL.md', kind: 'file' }];
      return skills.list(dir);
    },
    async read(filePath) {
      const normalized = String(filePath).replaceAll('\\', '/');
      const match = /^([^/]+)\/SKILL\.md$/.exec(normalized);
      if (match && (await agents()).has(match[1])) {
        return readFile(path.join(AGENTS_ROOT, `${match[1]}.md`));
      }
      return skills.read(filePath);
    },
  };
}

/**
 * @param {string} name
 */
export async function readSkill(name) {
  assertSkillName(name);
  const skillFile = path.join(SKILLS_ROOT, name, 'SKILL.md');
  const agentFile = path.join(AGENTS_ROOT, `${name}.md`);
  let file;
  let kind = 'skill';
  try {
    file = await insideRoot(SKILLS_ROOT, skillFile);
  } catch (error) {
    if (!(error instanceof CatalogError) || error.code !== 'not_found') throw error;
    try {
      file = await insideRoot(AGENTS_ROOT, agentFile);
      kind = 'agent';
    } catch (agentError) {
      if (agentError instanceof CatalogError && agentError.code === 'not_found') {
        throw new CatalogError(`Skill ${name} was not found.`, 'not_found');
      }
      throw agentError;
    }
  }
  const raw = await readFile(file, 'utf8');
  const { data } = parseFrontmatter(raw);
  return {
    name,
    description: data.description || data.name || name,
    raw,
    uri: skillUri(name),
    kind,
    tools: data.tools || '',
  };
}

/**
 * @param {string} markdown
 * @returns {string[]}
 */
export function referencedTemplates(markdown) {
  return [...new Set([...markdown.matchAll(TEMPLATE_REF)].map((match) => match[1]))];
}

/**
 * @returns {Promise<Array<{ filename: string, uri: string }>>}
 */
export async function listTemplates() {
  const entries = await readdir(TEMPLATES_ROOT, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && TEMPLATE_FILE.test(entry.name))
    .map((entry) => ({ filename: entry.name, uri: templateUri(entry.name) }))
    .sort((a, b) => a.filename.localeCompare(b.filename));
}

/**
 * @param {string} name filename with or without .md
 */
export async function readTemplate(name) {
  const filename = templateFilename(name);
  const candidate = path.join(TEMPLATES_ROOT, filename);
  let file;
  try {
    file = await insideRoot(TEMPLATES_ROOT, candidate);
  } catch (error) {
    if (error instanceof CatalogError && error.code === 'not_found') {
      throw new CatalogError(`Template ${filename} was not found.`, 'not_found');
    }
    throw error;
  }
  return {
    filename,
    uri: templateUri(filename),
    raw: await readFile(file, 'utf8'),
  };
}

export async function readMethod() {
  return readFile(METHOD_PATH, 'utf8');
}

/**
 * Procedure text plus every plugin template the procedure names.
 * @param {string} name
 * @param {string} [task]
 */
export async function composeSkill(name, task) {
  const skill = await readSkill(name);
  const wanted = referencedTemplates(skill.raw);
  const templates = [];
  const missing = [];
  for (const filename of wanted) {
    try {
      templates.push(await readTemplate(filename));
    } catch (error) {
      if (error instanceof CatalogError && error.code === 'not_found') missing.push(filename);
      else throw error;
    }
  }

  const parts = [
    `# uxos ${skill.kind}: ${skill.name}`,
    '',
  ];
  if (skill.kind === 'agent') {
    parts.push(
      'This is a uxos agent. Run it when a skill tells you to, and stay inside the role the procedure describes.',
      skill.tools ? `Tool allow-list: ${skill.tools}` : 'No tool allow-list is declared.',
      ''
    );
  }
  parts.push(
    'Follow this procedure exactly. Stop at its review gates, and do not replace it with a general UX workflow.',
    'Write project artifacts under `uxos/` in the working directory.',
    '`${CLAUDE_PLUGIN_ROOT}/templates/...` means a template from this plugin. Each template this procedure names is appended below.',
  );
  if (task && task.trim()) {
    parts.push('', 'Designer request:', task.trim());
  }
  parts.push('', skill.raw.trimEnd());
  if (templates.length || missing.length) {
    parts.push('', '---', '', '# Templates this skill names', '');
    for (const template of templates) {
      parts.push(`## templates/${template.filename}`, '', template.raw.trimEnd(), '');
    }
    for (const filename of missing) {
      parts.push(`## templates/${filename}`, '', `This template is named by the procedure and is not in plugin/templates.`, '');
    }
  }
  return { ...skill, templates, missing, markdown: `${parts.join('\n').trimEnd()}\n` };
}

/**
 * Slash commands in plugin/commands. Each is served as a prompt.
 * @returns {Promise<Array<{ name: string, description: string, argumentHint: string }>>}
 */
export async function listCommands() {
  if (!existsSync(COMMANDS_ROOT)) return [];
  const entries = await readdir(COMMANDS_ROOT, { withFileTypes: true });
  const commands = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const name = entry.name.slice(0, -3);
    if (!SKILL_NAME.test(name)) continue;
    const { data } = parseFrontmatter(await readFile(path.join(COMMANDS_ROOT, entry.name), 'utf8'));
    commands.push({ name, description: data.description || name, argumentHint: data['argument-hint'] || '' });
  }
  commands.sort((a, b) => a.name.localeCompare(b.name));
  return commands;
}

/**
 * One command as prompt text: $ARGUMENTS filled in, plugin template paths turned into
 * uxos://template/ resources, and a short preamble for clients that don't run plugins.
 * @param {string} name
 * @param {string} [args]
 */
export async function composeCommand(name, args) {
  assertSkillName(name);
  const file = await insideRoot(COMMANDS_ROOT, path.join(COMMANDS_ROOT, `${name}.md`));
  const { data, body } = parseFrontmatter(await readFile(file, 'utf8'));
  const given = args && args.trim() ? args.trim() : '';
  const text = body
    .replaceAll('$ARGUMENTS', given || '(nothing given)')
    .replace(TEMPLATE_REF, (_, filename) => templateUri(filename))
    .replaceAll('${CLAUDE_PLUGIN_ROOT}', 'the uxos plugin');
  const parts = [
    `# uxos command: ${name}`,
    '',
    'Carry out these steps in order. When a step says to run a uxos skill, call `get_skill` with that name and follow it, including its review gates. Templates are the `uxos://template/<file>` resources (or `get_template`). Call `check_project` first if you haven\'t this session.',
    '',
    text.trim(),
  ];
  return { name, description: data.description || name, markdown: `${parts.join('\n')}\n` };
}

function run(cmd, args) {
  return new Promise((resolve) => {
    execFile(cmd, args, { timeout: 5000 }, (error, stdout) => resolve(error ? null : stdout.trim()));
  });
}

/**
 * What the plugin's hook checks on every prompt, as one read-only report.
 * @param {string} dir project folder (the one that contains uxos/)
 */
export async function checkProject(dir) {
  const projectDir = path.resolve(dir || process.cwd());
  const uxos = path.join(projectDir, 'uxos');
  const report = { projectDir, hasProject: false, notes: [] };
  try {
    if (!(await stat(uxos)).isDirectory()) return report;
  } catch {
    report.notes.push('No uxos/ folder here. Start with the init command.');
    return report;
  }
  report.hasProject = true;

  let context = {};
  try {
    context = parseFrontmatter(await readFile(path.join(uxos, 'product-context.md'), 'utf8')).data;
  } catch {
    report.notes.push('uxos/product-context.md is missing.');
  }
  for (const key of ['project', 'project_type', 'user_role', 'design_tools', 'design_master']) {
    if (context[key]) report[key] = context[key];
  }

  const artifacts = [];
  const walk = async (folder, rel) => {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.name === 'sources') continue;
      const full = path.join(folder, entry.name);
      const relPath = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) await walk(full, relPath);
      else if (entry.name.endsWith('.md')) {
        const { data } = parseFrontmatter(await readFile(full, 'utf8'));
        artifacts.push({ path: `uxos/${relPath}`, status: data.status || '' });
      }
    }
  };
  await walk(uxos, '');
  report.artifacts = artifacts.sort((a, b) => a.path.localeCompare(b.path));

  if (existsSync(path.join(uxos, 'handoff')) && !existsSync(path.join(uxos, 'design-records'))) {
    report.legacyHandoffFolder = true;
    report.notes.push(
      context.design_records_path
        ? 'Design records live in uxos/handoff/ (the user chose to keep it). Read and write there wherever a skill says uxos/design-records/.'
        : 'Design records are in the old uxos/handoff/ folder. Wherever a skill says uxos/design-records/, use uxos/handoff/. Ask the user once whether to rename it to uxos/design-records/ (never without a yes); if they decline, set design_records_path: uxos/handoff in product-context.md.'
    );
  }

  if (context.repo && context.synced_commit) {
    const branch = context.repo_branch || 'main';
    const remote = /:\/\/|^git@/.test(context.repo);
    const repoDir = remote
      ? path.join(projectDir, 'uxos-repo-cache', path.basename(context.repo, '.git'))
      : path.resolve(projectDir, context.repo);
    const ref = remote ? `origin/${branch}` : branch;
    const count = await run('git', ['-C', repoDir, 'rev-list', '--count', `${context.synced_commit}..${ref}`]);
    if (count !== null) {
      report.commitsSinceSync = Number(count);
      if (report.commitsSinceSync > 0) {
        report.notes.push(
          `${report.commitsSinceSync} new commit(s) on ${branch} since the last sync. Before work that reads the model, ask the user whether to sync first (the code-sync skill).`
        );
      }
    }
  }
  return report;
}

/**
 * @param {unknown} error
 * @returns {string}
 */
export async function catalogErrorText(error) {
  if (!(error instanceof CatalogError)) throw error;
  if (error.code === 'not_found' && error.message.startsWith('Skill ')) {
    const names = (await listSkills()).map((skill) => skill.name);
    return `${error.message} Known skills: ${names.join(', ')}.`;
  }
  if (error.code === 'invalid_name' && /Skill name/.test(error.message)) {
    return error.message;
  }
  if (error.code === 'not_found') {
    const names = (await listTemplates()).map((template) => template.filename);
    return `Template not found. Known templates: ${names.join(', ')}.`;
  }
  return error.message;
}
