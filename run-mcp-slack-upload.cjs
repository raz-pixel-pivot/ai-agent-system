#!/usr/bin/env node
/**
 * Wrapper so slack-upload MCP runs with cwd = mcp-slack-upload/ (finds node_modules).
 * Cursor calls: node run-mcp-slack-upload.cjs
 */
const path = require("path");
const { spawn } = require("child_process");

const dir = path.join(__dirname, "mcp-slack-upload");
const child = spawn(process.execPath, ["index.js"], {
  cwd: dir,
  stdio: ["pipe", "pipe", "pipe"],
});

process.stdin.pipe(child.stdin);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
child.on("exit", (code) => process.exit(code ?? 0));
