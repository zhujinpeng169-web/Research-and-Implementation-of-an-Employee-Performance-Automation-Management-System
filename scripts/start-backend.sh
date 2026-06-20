#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "$0")" && pwd)/env.sh"

BACKEND_DIR="$PROJECT_ROOT/backend"
MAVEN_BIN="$MAVEN_HOME/bin/mvn"
BACKEND_PID_FILE="$RUN_DIR/backend.pid"
BACKEND_LOG_FILE="$RUN_DIR/backend.log"

"$PROJECT_ROOT/scripts/start-mysql.sh"

if lsof -nP -iTCP:"$BACKEND_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Backend already running at http://localhost:${BACKEND_PORT}"
  exit 0
fi

if [ ! -x "$MAVEN_BIN" ]; then
  echo "Maven not found: $MAVEN_BIN"
  exit 1
fi

echo "Starting backend..."
nohup env \
  JAVA_HOME="$JAVA_HOME" \
  PATH="$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH" \
  MYSQL_HOST="$MYSQL_HOST" \
  MYSQL_PORT="$MYSQL_PORT" \
  MYSQL_DATABASE="$MYSQL_DATABASE" \
  MYSQL_USERNAME="$MYSQL_USERNAME" \
  MYSQL_PASSWORD="$MYSQL_PASSWORD" \
  "$MAVEN_BIN" -f "$BACKEND_DIR/pom.xml" spring-boot:run >"$BACKEND_LOG_FILE" 2>&1 &

echo $! > "$BACKEND_PID_FILE"

for _ in $(seq 1 120); do
  if lsof -nP -iTCP:"$BACKEND_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "Backend ready at http://localhost:${BACKEND_PORT}"
    exit 0
  fi
  sleep 1
done

echo "Backend did not start in time. See log: $BACKEND_LOG_FILE"
tail -n 60 "$BACKEND_LOG_FILE" || true
exit 1
