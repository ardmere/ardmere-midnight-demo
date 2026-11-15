#!/usr/bin/env bash
# Run a demo command and rewrite the local home path for screen recording.
#
# Usage:
#   ./scripts/demo-run.sh npm run --silent demo:deploy
#   DEMO_USER=bryn ./scripts/demo-run.sh npm run --silent compile:standard-por
#
# The command still runs with the real HOME; only displayed output changes.
set -euo pipefail

TARGET_USER="${DEMO_USER:-bryn}"
TARGET_HOME="/Users/${TARGET_USER}"

"$@" 2>&1 | sed "s|${HOME}|${TARGET_HOME}|g"
