import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readdir, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';
import { SkillsClient } from '@modelcontextprotocol/client/ext/skills';
import { createMcpHandler } from '@modelcontextprotocol/server';

import { referencedTemplates } from './catalog.mjs';
import { createServer, sameFile, startHttp } from './server.mjs';

const PLUGIN_SKILLS = path.resolve(fileURLToPath(new URL('../plugin/skills/', import.meta.url)));
const PLUGIN_AGENTS = path.resolve(fileURLToPath(new URL('../plugin/agents/', import.meta.url)));

async function skillDirectories() {
  const entries = await readdir(PLUGIN_SKILLS, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

async function procedureNames() {
  const agents = await readdir(PLUGIN_AGENTS);
  return [
    ...(await skillDirectories()),
    ...agents.filter((name) => name.endsWith('.md')).map((name) => name.slice(0, -3)),
  ].sort();
}

async function withClient(run) {
  const handler = createMcpHandler(createServer);
  const transport = new StreamableHTTPClientTransport(new URL('http://uxos-skills.test/mcp'), {
    fetch: (url, init) => handler.fetch(new Request(url, init)),
  });
  const client = new Client(
    { name: 'uxos-skills-test', version: '0.0.0' },
    { versionNegotiation: { mode: 'auto' } }
  );
  await client.connect(transport);
  try {
    await run(client);
  } finally {
    await client.close();
    await handler.close();
  }
}

test('lists every plugin skill and loads one with its template', async () => {
  const expected = await procedureNames();
  await withClient(async (client) => {
    const tools = await client.listTools();
    const toolNames = tools.tools.map((tool) => tool.name).sort();
    assert.deepEqual(toolNames, ['get_skill', 'get_template', 'list_skills']);
    for (const tool of tools.tools) {
      assert.equal(tool.annotations.readOnlyHint, true);
      assert.equal(tool.annotations.destructiveHint, false);
      assert.equal(tool.annotations.openWorldHint, false);
    }

    const listed = await client.callTool({ name: 'list_skills', arguments: {} });
    assert.equal(listed.isError, undefined);
    assert.deepEqual(
      listed.structuredContent.skills.map((skill) => skill.name),
      expected
    );
    assert.equal(listed.structuredContent.skills[0].uri, 'skill://uxos/analyse-domain/SKILL.md');

    const skill = await client.callTool({
      name: 'get_skill',
      arguments: { name: 'analyse-domain', task: 'Map the lending domain' },
    });
    assert.equal(skill.isError, undefined);
    assert.equal(skill.structuredContent.name, 'analyse-domain');
    assert.match(skill.structuredContent.markdown, /Map the lending domain/);
    assert.match(skill.structuredContent.markdown, /# analyse-domain/);
    assert.match(skill.structuredContent.markdown, /## templates\/domain\.md/);
    assert.match(skill.structuredContent.markdown, /artifact: domain/);
    assert.deepEqual(skill.structuredContent.templateUris, ['uxos://template/domain.md']);
    assert.equal(skill.structuredContent.kind, 'skill');

    const agent = await client.callTool({ name: 'get_skill', arguments: { name: 'context-extractor' } });
    assert.equal(agent.structuredContent.kind, 'agent');
    assert.match(agent.structuredContent.markdown, /Tool allow-list: Read, Grep, Glob, Bash/);
    assert.match(agent.structuredContent.markdown, /You are the context-extractor/);

    const critic = listed.structuredContent.skills.find((item) => item.name === 'ux-critic');
    assert.equal(critic.kind, 'agent');
    assert.equal(critic.uri, 'skill://uxos/ux-critic/SKILL.md');

    const missing = await client.callTool({
      name: 'get_skill',
      arguments: { name: '../METHOD' },
    });
    assert.equal(missing.isError, true);
    assert.match(missing.content[0].text, /kebab-case/);

    const unknown = await client.callTool({
      name: 'get_skill',
      arguments: { name: 'not-a-skill' },
    });
    assert.equal(unknown.isError, true);
    assert.match(unknown.content[0].text, /analyse-domain/);
  });
});

test('templates and the method are readable resources', async () => {
  await withClient(async (client) => {
    const template = await client.callTool({
      name: 'get_template',
      arguments: { name: 'journey' },
    });
    assert.equal(template.structuredContent.filename, 'journey.md');
    assert.match(template.structuredContent.markdown, /^---/);

    const escaped = await client.callTool({
      name: 'get_template',
      arguments: { name: '../skills/analyse-domain/SKILL' },
    });
    assert.equal(escaped.isError, true);

    const resources = await client.listResources();
    const uris = resources.resources.map((resource) => resource.uri);
    assert.ok(uris.includes('uxos://method'));
    assert.ok(uris.includes('uxos://template/requirements.md'));

    const method = await client.readResource({ uri: 'uxos://method' });
    assert.match(method.contents[0].text, /Skill-first rule/);

    const resource = await client.readResource({ uri: 'skill://uxos/edge-case-analysis/SKILL.md' });
    assert.match(resource.contents[0].text, /name: edge-case-analysis/);
  });
});

test('the skills extension lists and verifies every plugin skill', async () => {
  const expected = await procedureNames();
  await withClient(async (client) => {
    const skills = new SkillsClient(client);
    assert.equal(skills.supported, true);
    const listing = await skills.list();
    assert.deepEqual(
      listing.skills.map((skill) => skill.frontmatter.name).sort(),
      expected
    );
    const entry = listing.skills.find((skill) => skill.frontmatter.name === 'promote-to-code');
    assert.equal(entry.uri, 'skill://uxos/promote-to-code/SKILL.md');
    const file = await skills.read(entry);
    assert.equal(file.verified, true);
    assert.match(file.text, /design_master: code/);
  });
});

test('each skill is a prompt and every named template exists', async () => {
  const expected = await procedureNames();
  await withClient(async (client) => {
    const prompts = await client.listPrompts();
    assert.deepEqual(
      prompts.prompts.map((prompt) => prompt.name).sort(),
      expected
    );

    const prompt = await client.getPrompt({
      name: 'requirements-drafting',
      arguments: { task: 'Draft units for checkout' },
    });
    assert.match(prompt.messages[0].content.text, /Draft units for checkout/);
    assert.match(prompt.messages[0].content.text, /## templates\/requirements\.md/);

    for (const name of expected) {
      const loaded = await client.callTool({ name: 'get_skill', arguments: { name } });
      assert.equal(loaded.isError, undefined, name);
      const refs = referencedTemplates(loaded.structuredContent.markdown);
      for (const filename of refs) {
        assert.ok(
          loaded.structuredContent.templateUris.includes(`uxos://template/${filename}`),
          `${name} missing ${filename}`
        );
      }
    }
  });
});

test('stdio entrypoint lists every skill', async () => {
  const client = new Client(
    { name: 'uxos-skills-stdio', version: '0.0.0' },
    { versionNegotiation: { mode: 'auto' } }
  );
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [fileURLToPath(new URL('./server.mjs', import.meta.url))],
    stderr: 'pipe',
  });
  await client.connect(transport);
  try {
    const listed = await client.callTool({ name: 'list_skills', arguments: {} });
    assert.equal(listed.isError, undefined);
    assert.equal(listed.structuredContent.skills.length, (await procedureNames()).length);
  } finally {
    await client.close();
  }
});

test('http mode serves the skills on /mcp', async () => {
  const started = await startHttp({ host: '127.0.0.1', port: 0 });
  const client = new Client(
    { name: 'uxos-skills-http', version: '0.0.0' },
    { versionNegotiation: { mode: 'auto' } }
  );
  try {
    await client.connect(new StreamableHTTPClientTransport(new URL(started.url)));
    const listed = await client.callTool({ name: 'list_skills', arguments: {} });
    assert.equal(listed.isError, undefined);
    assert.equal(listed.structuredContent.skills.length, (await procedureNames()).length);
    assert.equal(
      listed.structuredContent.skills.find((skill) => skill.name === 'ux-critic').kind,
      'agent'
    );

    const other = await fetch(new URL('/', started.url));
    assert.equal(other.status, 404);
    await other.text();
  } finally {
    await client.close();
    await started.close();
  }
});

function waitForReady(child) {
  let stderr = '';
  child.stderr.on('data', (chunk) => {
    stderr += chunk;
  });
  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (error, url) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (error) reject(error);
      else resolve(url);
    };
    const timer = setTimeout(() => finish(new Error(`server did not start\n${stderr}`)), 10000);
    child.stderr.on('data', () => {
      const match = stderr.match(/http:\/\/127\.0\.0\.1:\d+\/mcp/);
      if (match) finish(null, match[0]);
    });
    child.on('error', (error) => finish(error));
    child.on('exit', (code) => finish(new Error(`server exited ${code}\n${stderr}`)));
  });
}

async function assertHttpCli(args, options) {
  const child = spawn(process.execPath, [...args, '--http', '--port', '0'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  });
  try {
    const ready = await waitForReady(child);
    const response = await fetch(new URL('/', ready));
    assert.equal(response.status, 404);
    await response.text();
  } finally {
    child.kill();
  }
}

test('http cli starts when the bin is a symlink, as npx does on macOS and Linux', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'uxos-bin-'));
  const link = path.join(dir, 'uxos-skills-mcp');
  await symlink(fileURLToPath(new URL('./server.mjs', import.meta.url)), link);
  try {
    await assertHttpCli([link]);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('http cli starts from a relative path with .., as the Windows npm shim passes it', async () => {
  await assertHttpCli([path.join('..', 'server.mjs')], {
    cwd: fileURLToPath(new URL('./scripts/', import.meta.url)),
  });
});

test('entry check matches npm bin paths on windows, macOS, and linux', async () => {
  const modulePath = fileURLToPath(new URL('./server.mjs', import.meta.url));
  const dir = await mkdtemp(path.join(tmpdir(), 'uxos-entry-'));
  const link = path.join(dir, 'uxos-skills-mcp');
  await symlink(modulePath, link);
  try {
    assert.equal(sameFile(modulePath, modulePath), true);
    assert.equal(sameFile(link, modulePath), true);
    assert.equal(sameFile(path.join(path.dirname(modulePath), 'scripts', '..', 'server.mjs'), modulePath), true);
    assert.equal(sameFile(path.join(dir, 'other.mjs'), modulePath), false);
    assert.equal(sameFile(undefined, modulePath), false);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }

  const win = path.win32;
  const target = 'C:\\pkg\\node_modules\\@99x-ai-dlc\\uxos-skills-mcp\\server.mjs';
  const shim = 'C:\\pkg\\node_modules\\.bin\\..\\@99x-ai-dlc\\uxos-skills-mcp\\server.mjs';
  const windows = { pathApi: win, realpath: (filePath) => filePath };
  assert.equal(sameFile(shim, target, windows), true);
  assert.equal(sameFile('c:\\pkg\\server.mjs', 'C:\\pkg\\server.mjs', windows), true);
  assert.equal(sameFile('C:/pkg/server.mjs', 'C:\\pkg\\server.mjs', windows), true);
  assert.equal(sameFile('\\\\?\\C:\\pkg\\server.mjs', 'C:\\pkg\\server.mjs', windows), true);
  assert.equal(
    sameFile('\\\\?\\UNC\\server\\share\\pkg\\server.mjs', '\\\\server\\share\\pkg\\server.mjs', windows),
    true
  );
  assert.equal(sameFile('D:\\pkg\\server.mjs', 'C:\\pkg\\server.mjs', windows), false);
});
