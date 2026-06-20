#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

export JAVA_HOME="${JAVA_HOME:-$HOME/.local/tools/jdk-17.0.12.jdk/Contents/Home}"
export MAVEN_HOME="${MAVEN_HOME:-$HOME/.local/tools/apache-maven-3.9.11}"
export MYSQL_HOME="${MYSQL_HOME:-$HOME/.local/tools/mysql-8.4.9-macos15-arm64}"

export MYSQL_DATA_DIR="${MYSQL_DATA_DIR:-$HOME/.local/mysql-data}"
export MYSQL_HOST="${MYSQL_HOST:-127.0.0.1}"
export MYSQL_PORT="${MYSQL_PORT:-3306}"
export MYSQL_DATABASE="${MYSQL_DATABASE:-employee_performance_db}"
export MYSQL_USERNAME="${MYSQL_USERNAME:-root}"
export MYSQL_PASSWORD="${MYSQL_PASSWORD:-}"

export BACKEND_PORT="${BACKEND_PORT:-8080}"
export FRONTEND_PORT="${FRONTEND_PORT:-3001}"

export PATH="$JAVA_HOME/bin:$MAVEN_HOME/bin:$MYSQL_HOME/bin:$PATH"

RUN_DIR="$PROJECT_ROOT/.run"
mkdir -p "$RUN_DIR"

export PROJECT_ROOT RUN_DIR
