#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "$0")" && pwd)/env.sh"

FRONTEND_DIR="$PROJECT_ROOT/frontend"
FRONTEND_PID_FILE="$RUN_DIR/frontend.pid"
FRONTEND_LOG_FILE="$RUN_DIR/frontend.log"

if lsof -nP -iTCP:"$FRONTEND_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Frontend already running at http://localhost:${FRONTEND_PORT}"
  exit 0
fi

echo "Starting frontend..."
cd "$FRONTEND_DIR"
nohup npm run dev -- --host 0.0.0.0 --port "$FRONTEND_PORT" </dev/null >"$FRONTEND_LOG_FILE" 2>&1 &
echo $! > "$FRONTEND_PID_FILE"

for _ in $(seq 1 60); do
  if lsof -nP -iTCP:"$FRONTEND_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "Frontend ready at http://localhost:${FRONTEND_PORT}"
    exit 0
  fi
  sleep 1
done

echo "Frontend did not start in time. See log: $FRONTEND_LOG_FILE"
tail -n 60 "$FRONTEND_LOG_FILE" || true
exit 1
