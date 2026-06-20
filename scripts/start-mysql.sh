#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "$0")" && pwd)/env.sh"

MYSQL_BIN="$MYSQL_HOME/bin/mysql"
MYSQLD_BIN="$MYSQL_HOME/bin/mysqld"
MYSQLADMIN_BIN="$MYSQL_HOME/bin/mysqladmin"

mysqladmin_ping() {
  if [ -n "$MYSQL_PASSWORD" ]; then
    MYSQL_PWD="$MYSQL_PASSWORD" "$MYSQLADMIN_BIN" -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USERNAME" ping
  else
    "$MYSQLADMIN_BIN" -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USERNAME" ping
  fi
}

mysql_exec() {
  if [ -n "$MYSQL_PASSWORD" ]; then
    MYSQL_PWD="$MYSQL_PASSWORD" "$MYSQL_BIN" -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USERNAME" "$@"
  else
    "$MYSQL_BIN" -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USERNAME" "$@"
  fi
}

if mysqladmin_ping >/dev/null 2>&1; then
  echo "MySQL already running at ${MYSQL_HOST}:${MYSQL_PORT}"
else
  mkdir -p "$MYSQL_DATA_DIR"

  if [ ! -d "$MYSQL_DATA_DIR/mysql" ]; then
    echo "Initializing MySQL data directory: $MYSQL_DATA_DIR"
    "$MYSQLD_BIN" --initialize-insecure --datadir="$MYSQL_DATA_DIR"
  fi

  echo "Starting MySQL..."
  "$MYSQLD_BIN" \
    --datadir="$MYSQL_DATA_DIR" \
    --port="$MYSQL_PORT" \
    --bind-address=127.0.0.1 \
    --socket=/tmp/mysql.sock \
    --pid-file="$RUN_DIR/mysql.pid" \
    --log-error="$RUN_DIR/mysql.log" \
    --daemonize

  for _ in $(seq 1 40); do
    if mysqladmin_ping >/dev/null 2>&1; then
      break
    fi
    sleep 1
  done

  if ! mysqladmin_ping >/dev/null 2>&1; then
    echo "MySQL failed to start. See log: $RUN_DIR/mysql.log"
    exit 1
  fi
fi

mysql_exec -e "CREATE DATABASE IF NOT EXISTS \`$MYSQL_DATABASE\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
echo "MySQL ready. Database: $MYSQL_DATABASE"
