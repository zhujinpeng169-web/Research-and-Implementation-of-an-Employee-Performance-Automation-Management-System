#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "$0")" && pwd)/env.sh"

MYSQL_BIN="$MYSQL_HOME/bin/mysql"
SEED_SQL="${1:-$PROJECT_ROOT/database/demo_seed_employee_performance_db.sql}"

if [ ! -f "$SEED_SQL" ]; then
  echo "Seed SQL not found: $SEED_SQL"
  exit 1
fi

"$PROJECT_ROOT/scripts/start-mysql.sh"

echo "Seeding database using: $SEED_SQL"
if [ -n "$MYSQL_PASSWORD" ]; then
  MYSQL_PWD="$MYSQL_PASSWORD" "$MYSQL_BIN" -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USERNAME" -D"$MYSQL_DATABASE" < "$SEED_SQL"
else
  "$MYSQL_BIN" -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USERNAME" -D"$MYSQL_DATABASE" < "$SEED_SQL"
fi

echo "Database seed completed."
