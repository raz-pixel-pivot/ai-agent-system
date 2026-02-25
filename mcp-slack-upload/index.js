#!/usr/bin/env node
/**
 * MCP server: upload_file_to_slack
 * Workaround to post video (or any file) from agent artifacts to a Slack channel/thread.
 * Agent must pass file content as base64 (e.g. after reading from /opt/cursor/artifacts/).
 * Env: SLACK_BOT_TOKEN (required), SLACK_DEFAULT_CHANNEL_ID (optional).
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const SLACK_UPLOAD_URL = "https://slack.com/api/files.upload";

const mcp = new McpServer({
  name: "mcp-slack-upload",
  version: "1.0.0",
});

mcp.registerTool(
  "upload_file_to_slack",
  {
    description:
      "Upload a file (e.g. video artifact) to a Slack channel or thread. Pass the file content as base64 (read the file and encode it). Use for posting screen recordings to the Slack thread. Requires SLACK_BOT_TOKEN and Slack app scope files:write.",
    inputSchema: {
      filename: z.string().describe("Filename to show in Slack (e.g. walkthrough.mp4)"),
      file_content_base64: z
        .string()
        .describe("File content encoded as base64 (read file and encode)"),
      channel_id: z
        .string()
        .optional()
        .describe(
          "Slack channel ID (e.g. C01234567). If omitted, uses SLACK_DEFAULT_CHANNEL_ID."
        ),
      thread_ts: z
        .string()
        .optional()
        .describe(
          "Parent message timestamp to reply in thread. Use the thread_ts of the message that triggered the task."
        ),
      initial_comment: z.string().optional().describe("Optional comment with the file"),
    },
  },
  async (args) => {
    const token = process.env.SLACK_BOT_TOKEN;
    if (!token) {
      return {
        content: [
          {
            type: "text",
            text: "SLACK_BOT_TOKEN is not set. Set it in Cursor MCP env for this server.",
          },
        ],
        isError: true,
      };
    }

    const channel_id = args.channel_id || process.env.SLACK_DEFAULT_CHANNEL_ID;
    if (!channel_id) {
      return {
        content: [
          {
            type: "text",
            text: "channel_id is required (or set SLACK_DEFAULT_CHANNEL_ID). Get channel ID: right-click channel → View channel details.",
          },
        ],
        isError: true,
      };
    }

    let buffer;
    try {
      buffer = Buffer.from(args.file_content_base64, "base64");
    } catch (e) {
      return {
        content: [{ type: "text", text: `Invalid base64: ${e.message}` }],
        isError: true,
      };
    }

    const form = new FormData();
    form.append("token", token);
    form.append("channels", channel_id);
    form.append("file", new Blob([buffer]), args.filename || "file");
    form.append("filename", args.filename || "file");
    if (args.thread_ts) form.append("thread_ts", args.thread_ts);
    if (args.initial_comment) form.append("initial_comment", args.initial_comment);

    const res = await fetch(SLACK_UPLOAD_URL, {
      method: "POST",
      body: form,
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json().catch(() => ({}));
    if (!data.ok) {
      return {
        content: [
          {
            type: "text",
            text: `Slack upload failed: ${data.error || res.status}. Add scope files:write to the Slack app and invite the app to the channel.`,
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `File "${args.filename}" uploaded to Slack. ${args.thread_ts ? "Posted in thread." : "Posted to channel."}`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await mcp.connect(transport);
