#!/usr/bin/env node
/**
 * MCP server for the uxos plugin skills in plugin/skills.
 *
 * Skills extension (SEP-2640): skills/list, skills/get, and
 *   skill://uxos/<name>/SKILL.md
 * plugin/skills are served as skills. plugin/agents (context-extractor,
 * ux-critic) are served in the same catalog; list_skills marks them as agents.
 * Tools for hosts that call tools: list_skills, get_skill, get_template.
 *   get_skill appends the plugin templates the procedure names.
 * Resources: uxos://template/<file>, uxos://method
 * Prompts: one per skill, registered at process start.
 * Restart the server after scripts/build.sh adds, removes, or edits a skill.
 *
 * Run:
 *   node mcp/server.mjs                         stdio
 *   node mcp/server.mjs --http                  http://127.0.0.1:3333/mcp
 *   node mcp/server.mjs --http --port 8787 --host 127.0.0.1
 */
import { realpathSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  hostHeaderValidation,
  localhostHostValidation,
  localhostOriginValidation,
  originValidation,
  toNodeHandler,
} from '@modelcontextprotocol/node';
import { McpServer, ResourceTemplate, completable, createMcpHandler } from '@modelcontextprotocol/server';
import { SkillsExtension } from '@modelcontextprotocol/server/ext/skills';
import * as z from 'zod/v4';

import {
  CatalogError,
  METHOD_URI,
  catalogErrorText,
  composeSkill,
  listSkills,
  listTemplates,
  pluginSkillFiles,
  pluginVersion,
  readMethod,
  readTemplate,
} from './catalog.mjs';

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

const INSTRUCTIONS = [
  'uxos skills are the procedures for UX and product-design work. They are served at skill://uxos/<name>/SKILL.md.',
  'context-extractor and ux-critic are agents in that same list. Run an agent when a skill tells you to.',
  'Before producing project work, call list_skills, then get_skill for the one procedure that fits, and follow it, including its review gates.',
  'Do not substitute a general UX workflow. get_skill returns the procedure and every plugin template it names.',
  'Project artifacts are written under uxos/ in the working directory.',
  'The full method, gates, and skill-first routing table are the resource uxos://method.',
].join(' ');

function textResult(text, structuredContent) {
  const result = { content: [{ type: 'text', text }] };
  if (structuredContent !== undefined) result.structuredContent = structuredContent;
  return result;
}

function errorResult(text) {
  return { content: [{ type: 'text', text }], isError: true };
}

/**
 * @returns {Promise<McpServer>}
 */
export async function createServer() {
  const version = await pluginVersion();
  const server = new McpServer(
    { name: 'uxos-skills', version },
    { instructions: INSTRUCTIONS }
  );

  server.registerTool(
    'list_skills',
    {
      title: 'List uxos skills',
      description:
        'List every uxos procedure: the skills in plugin/skills and the agents in plugin/agents. Each entry has a name, description, kind (skill or agent), and resource URI. Call this before UX or product-design work, then get_skill for the matching procedure. This tool only lists procedures; it does not run them.',
      annotations: READ_ONLY,
      inputSchema: z.object({}),
      outputSchema: z.object({
        skills: z.array(
          z.object({
            name: z.string(),
            description: z.string(),
            uri: z.string(),
            kind: z.enum(['skill', 'agent']),
          })
        ),
      }),
    },
    async () => {
      const skills = await listSkills();
      const lines = skills.map((skill) => `- ${skill.name} (${skill.kind}): ${skill.description}`);
      const text = [
        `${skills.length} uxos procedures. Call get_skill with the name of the one to follow.`,
        `Method and skill-first routing: ${METHOD_URI}`,
        '',
        ...lines,
      ].join('\n');
      return textResult(text, {
        skills: skills.map(({ name, description, uri, kind }) => ({ name, description, uri, kind })),
      });
    }
  );

  server.registerTool(
    'get_skill',
    {
      title: 'Get a uxos skill',
      description:
        'Return one uxos skill procedure by name, including every plugin template it names. Follow the returned procedure exactly. Call list_skills when the name is not already known.',
      annotations: READ_ONLY,
      inputSchema: z.object({
        name: completable(
          z
            .string()
            .describe('Skill name, for example analyse-domain or journey-design'),
          async (value) => {
            const skills = await listSkills();
            return skills.map((skill) => skill.name).filter((name) => name.startsWith(value));
          }
        ),
        task: z
          .string()
          .optional()
          .describe('The designer request this procedure should carry out'),
      }),
      outputSchema: z.object({
        name: z.string(),
        description: z.string(),
        uri: z.string(),
        kind: z.enum(['skill', 'agent']),
        templateUris: z.array(z.string()),
        markdown: z.string(),
      }),
    },
    async ({ name, task }) => {
      try {
        const skill = await composeSkill(name, task);
        return textResult(skill.markdown, {
          name: skill.name,
          description: skill.description,
          uri: skill.uri,
          kind: skill.kind,
          templateUris: skill.templates.map((template) => template.uri),
          markdown: skill.markdown,
        });
      } catch (error) {
        if (error instanceof CatalogError) return errorResult(await catalogErrorText(error));
        throw error;
      }
    }
  );

  server.registerTool(
    'get_template',
    {
      title: 'Get a uxos template',
      description:
        'Read one uxos artifact template from plugin/templates by filename, such as domain.md or journey.md. Skills already include the templates they name; use this when a template is needed on its own.',
      annotations: READ_ONLY,
      inputSchema: z.object({
        name: completable(
          z.string().describe('Template filename, with or without .md, such as domain.md'),
          async (value) => {
            const templates = await listTemplates();
            const needle = value.endsWith('.md') || value.includes('.') ? value : `${value}.md`;
            return templates
              .map((template) => template.filename)
              .filter((filename) => filename.startsWith(needle) || filename.startsWith(value));
          }
        ),
      }),
      outputSchema: z.object({
        filename: z.string(),
        uri: z.string(),
        markdown: z.string(),
      }),
    },
    async ({ name }) => {
      try {
        const template = await readTemplate(name);
        return textResult(template.raw, {
          filename: template.filename,
          uri: template.uri,
          markdown: template.raw,
        });
      } catch (error) {
        if (error instanceof CatalogError) return errorResult(await catalogErrorText(error));
        throw error;
      }
    }
  );

  server.registerResource(
    'method',
    METHOD_URI,
    {
      title: 'uxos method',
      description:
        'The uxos method: phases, gates, and the skill-first rule that maps a request to a skill.',
      mimeType: 'text/markdown',
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: 'text/markdown', text: await readMethod() }],
    })
  );

  const catalog = await SkillsExtension.load(pluginSkillFiles(), { prefix: 'uxos', strict: true });
  catalog.attach(server);

  server.registerResource(
    'template',
    new ResourceTemplate('uxos://template/{filename}', {
      list: async () => ({
        resources: (await listTemplates()).map((template) => ({
          uri: template.uri,
          name: template.filename,
          mimeType: 'text/markdown',
        })),
      }),
    }),
    {
      title: 'uxos template',
      description: 'One uxos artifact template from plugin/templates.',
      mimeType: 'text/markdown',
    },
    async (uri, { filename }) => {
      const template = await readTemplate(String(filename));
      return {
        contents: [{ uri: uri.href, mimeType: 'text/markdown', text: template.raw }],
      };
    }
  );

  const skills = await listSkills();
  for (const skill of skills) {
    server.registerPrompt(
      skill.name,
      {
        title: skill.name,
        description: skill.description,
        argsSchema: z.object({
          task: z
            .string()
            .optional()
            .describe('The designer request this skill should carry out'),
        }),
      },
      async ({ task }) => {
        const loaded = await composeSkill(skill.name, task);
        return {
          messages: [
            {
              role: 'user',
              content: { type: 'text', text: loaded.markdown },
            },
          ],
        };
      }
    );
  }

  return server;
}

const LOOPBACK_HOSTS = new Set(['127.0.0.1', 'localhost', '::1']);

function endpointGuards(bindHost) {
  if (LOOPBACK_HOSTS.has(bindHost)) {
    return { host: localhostHostValidation(), origin: localhostOriginValidation() };
  }
  const names = ['localhost', '127.0.0.1', '[::1]'];
  if (bindHost !== '0.0.0.0' && bindHost !== '::') {
    names.push(bindHost.includes(':') && !bindHost.startsWith('[') ? `[${bindHost}]` : bindHost);
  }
  return { host: hostHeaderValidation(names), origin: originValidation(names) };
}

/**
 * Streamable HTTP on /mcp. Loopback binds accept only localhost Host and Origin headers.
 * @param {{ host?: string, port?: number }} [options]
 */
export async function startHttp({ host = '127.0.0.1', port = 3333 } = {}) {
  const handler = createMcpHandler(createServer, {
    onerror: (error) => console.error(error),
  });
  const handle = toNodeHandler(handler, {
    onerror: (error) => console.error(error),
  });
  const validate = endpointGuards(host);
  const httpServer = http.createServer((req, res) => {
    const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
    if (pathname !== '/mcp') {
      res.writeHead(404, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: 'MCP endpoint is /mcp' }));
      return;
    }
    if (!validate.host(req, res) || !validate.origin(req, res)) return;
    void handle(req, res);
  });

  await new Promise((resolve, reject) => {
    const onError = (error) => reject(error);
    httpServer.once('error', onError);
    httpServer.listen(port, host, () => {
      httpServer.off('error', onError);
      resolve();
    });
  });

  const address = httpServer.address();
  const boundPort = typeof address === 'object' && address ? address.port : port;
  const publishedHost = host.includes(':') && !host.startsWith('[') ? `[${host}]` : host;
  return {
    url: `http://${publishedHost}:${boundPort}/mcp`,
    close: async () => {
      await handler.close();
      await new Promise((resolve, reject) => {
        httpServer.close((error) => (error ? reject(error) : resolve()));
      });
    },
  };
}

function parseArgs(argv) {
  let httpMode = false;
  let port = 3333;
  let host = '127.0.0.1';
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--http') {
      httpMode = true;
    } else if (arg === '--port') {
      const value = argv[i + 1];
      port = Number(value);
      if (!Number.isInteger(port) || port < 0 || port > 65535) {
        throw new Error(`Invalid --port ${value ?? ''}`);
      }
      i += 1;
    } else if (arg === '--host') {
      host = argv[i + 1];
      if (!host) throw new Error('Missing value for --host');
      i += 1;
    } else {
      throw new Error(`Unknown argument ${arg}`);
    }
  }
  return { httpMode, port, host };
}

function stripLongPathPrefix(filePath) {
  if (filePath.startsWith('\\\\?\\UNC\\')) return `\\\\${filePath.slice(8)}`;
  if (filePath.startsWith('\\\\?\\')) return filePath.slice(4);
  return filePath;
}

function canonicalPath(filePath, pathApi, realpath) {
  const resolved = pathApi.resolve(stripLongPathPrefix(filePath));
  try {
    return pathApi.resolve(stripLongPathPrefix(realpath(resolved)));
  } catch {
    return resolved;
  }
}

/**
 * True when both paths name the same file.
 * macOS and Linux npx run a symlink. Windows npx runs a cmd shim that passes
 * node a path which may contain "..", a different drive-letter case, or a
 * "\\?\" prefix. path.win32.relative treats drive-letter case as equal.
 * @param {string | undefined} entry process.argv[1]
 * @param {string | undefined} moduleFilename this file on disk
 * @param {{ pathApi?: path.PlatformPath, realpath?: (filePath: string) => string }} [options]
 */
export function sameFile(entry, moduleFilename, { pathApi = path, realpath = realpathSync } = {}) {
  if (!entry || !moduleFilename) return false;
  const left = canonicalPath(entry, pathApi, realpath);
  const right = canonicalPath(moduleFilename, pathApi, realpath);
  return left === right || pathApi.relative(left, right) === '';
}

function invokedDirectly() {
  if (import.meta.main === true) return true;
  return sameFile(process.argv[1], fileURLToPath(import.meta.url));
}

if (invokedDirectly()) {
  try {
    const args = parseArgs(process.argv.slice(2));
    const count = (await listSkills()).length;
    if (args.httpMode) {
      const started = await startHttp({ host: args.host, port: args.port });
      console.error(`uxos-skills MCP ready (${count} skills, ${started.url})`);
    } else {
      const { StdioServerTransport } = await import('@modelcontextprotocol/server/stdio');
      const server = await createServer();
      console.error(`uxos-skills MCP ready (${count} skills, stdio)`);
      await server.connect(new StdioServerTransport());
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
