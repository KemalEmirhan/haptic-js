#!/usr/bin/env bash
# Bump package.json version only (no commit, no tag).
# Usage: ./scripts/bump.sh [patch|minor|major]

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PART="${1:-patch}"
case "$PART" in
  patch|minor|major) ;;
  *) echo "Usage: $0 [patch|minor|major]"; exit 1 ;;
esac

V=$(node -p "require('./package.json').version")
IFS='.' read -r ma mi pa <<< "$V"
case "$PART" in
  patch) pa=$((pa+1)) ;;
  minor) mi=$((mi+1)); pa=0 ;;
  major) ma=$((ma+1)); mi=0; pa=0 ;;
esac
NEW="$ma.$mi.$pa"

node -e "
const p = require('./package.json');
p.version = '$NEW';
require('fs').writeFileSync('package.json', JSON.stringify(p, null, 2) + '\n');
"
echo "Version bumped to $NEW"
