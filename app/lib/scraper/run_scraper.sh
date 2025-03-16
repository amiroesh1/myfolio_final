#!/bin/bash

# Get the absolute path to the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Activate virtual environment
source "$APP_DIR/venv/bin/activate"

# Navigate to the scraper directory
cd "$SCRIPT_DIR"

# Run the scraper
python run_scraper.py

# Deactivate virtual environment
deactivate 