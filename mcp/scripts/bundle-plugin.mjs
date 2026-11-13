import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const mcpRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = path.resolve(mcpRoot, '..');
const source = path.join(repoRoot, 'plugin');
const dest = path.join(mcpRoot, 'plugin');

await rm(dest, { recursive: true, force: true });
await mkdir(path.join(dest, '.claude-plugin'), { recursive: true });
await cp(path.join(source, 'skills'), path.join(dest, 'skills'), { recursive: true });
await cp(path.join(source, 'agents'), path.join(dest, 'agents'), { recursive: true });
await cp(path.join(source, 'templates'), path.join(dest, 'templates'), { recursive: true });
await cp(path.join(source, 'METHOD.md'), path.join(dest, 'METHOD.md'));
await cp(path.join(source, '.claude-plugin', 'plugin.json'), path.join(dest, '.claude-plugin', 'plugin.json'));
await cp(path.join(repoRoot, 'LICENSE'), path.join(mcpRoot, 'LICENSE'));
