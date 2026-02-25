#!/bin/bash

# Test script to verify Slack thread support
# Run this from any Cloud Agent to check if thread support is working

echo "==================================="
echo "Slack Thread Support Test"
echo "==================================="
echo ""

echo "📋 Checking environment variables..."
echo ""

# Check SLACK_BOT_TOKEN
if [ -n "$SLACK_BOT_TOKEN" ]; then
  echo "✅ SLACK_BOT_TOKEN: Set (length: ${#SLACK_BOT_TOKEN} chars)"
else
  echo "❌ SLACK_BOT_TOKEN: Not set"
fi

# Check SLACK_DEFAULT_CHANNEL_ID
if [ -n "$SLACK_DEFAULT_CHANNEL_ID" ]; then
  echo "✅ SLACK_DEFAULT_CHANNEL_ID: $SLACK_DEFAULT_CHANNEL_ID"
else
  echo "❌ SLACK_DEFAULT_CHANNEL_ID: Not set"
fi

# Check SLACK_THREAD_TS (the key one for thread support)
echo ""
echo "🧵 Thread Support Status:"
if [ -n "$SLACK_THREAD_TS" ]; then
  echo "✅ SLACK_THREAD_TS: $SLACK_THREAD_TS"
  echo ""
  echo "🎉 Thread support is ACTIVE!"
  echo "   Videos will be posted as replies within the thread."
else
  echo "❌ SLACK_THREAD_TS: Not set"
  echo ""
  echo "⚠️  Thread support is INACTIVE"
  echo "   This could mean:"
  echo "   1. Agent was invoked from a top-level channel message (not a thread)"
  echo "   2. Cursor has not yet implemented SLACK_THREAD_TS injection"
  echo ""
  echo "   If you invoked this from a thread, Cursor needs to add support."
  echo "   See: CURSOR_REQUIREMENTS.md for details"
fi

echo ""
echo "==================================="
echo "Test Complete"
echo "==================================="
