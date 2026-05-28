#!/bin/zsh
cd "$(dirname "$0")"
exec /opt/homebrew/bin/node_modules/.bin/next start -p 3031 2>/dev/null || \
  exec npx next start -p 3031
