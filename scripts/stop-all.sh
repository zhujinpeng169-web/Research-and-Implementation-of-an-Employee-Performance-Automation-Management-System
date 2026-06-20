#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "$0")" && pwd)/env.sh"

MYSQLADMIN_BIN="$MYSQL_HOME/bin/mysqladmin"

if [ -f "$RUN_DIR/frontend.pid" ]; then
  FRONT_PID="$(cat "$RUN_DIR/frontend.pid" || true)"
  if [ -n "${FRONT_PID:-}" ] && kill -0 "$FRONT_PID" >/dev/null 2>&1; then
    kill "$FRONT_PID" || true
  fi
fi
pkill -f "vite --host 0.0.0.0 --port ${FRONTEND_PORT}" >/dev/null 2>&1 || true
echo "Frontend stopped."

if [ -f "$RUN_DIR/backend.pid" ]; then
  BACK_PID="$(cat "$RUN_DIR/backend.pid" || true)"
  if [ -n "${BACK_PID:-}" ] && kill -0 "$BACK_PID" >/dev/null 2>&1; then
    kill "$BACK_PID" || true
  fi
fi
if lsof -nP -iTCP:"$BACKEND_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  lsof -tiTCP:"$BACKEND_PORT" -sTCP:LISTEN | xargs kill >/dev/null 2>&1 || true
fi
echo "Backend stopped."

if [ -n "$MYSQL_PASSWORD" ]; then
  MYSQL_PWD="$MYSQL_PASSWORD" "$MYSQLADMIN_BIN" -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USERNAME" shutdown >/dev/null 2>&1 || true
else
  "$MYSQLADMIN_BIN" -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USERNAME" shutdown >/dev/null 2>&1 || true
fi
echo "MySQL stopped."
