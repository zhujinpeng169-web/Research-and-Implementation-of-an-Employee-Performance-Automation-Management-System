#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "$0")" && pwd)/env.sh"

"$PROJECT_ROOT/scripts/start-mysql.sh"
"$PROJECT_ROOT/scripts/start-backend.sh"
"$PROJECT_ROOT/scripts/start-frontend.sh"

echo ""
echo "All services are running:"
echo "Frontend: http://localhost:${FRONTEND_PORT}"
echo "Backend:  http://localhost:${BACKEND_PORT}"
echo "MySQL:    ${MYSQL_HOST}:${MYSQL_PORT} (db: ${MYSQL_DATABASE})"
