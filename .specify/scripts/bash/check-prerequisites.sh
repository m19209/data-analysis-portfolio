#!/bin/bash
# check-prerequisites.sh
FEATURE_DIR=$(cat .specify/feature.json | python3 -c "import sys, json; print(json.load(sys.stdin).get('feature_directory', ''))" 2>/dev/null)
if [ -z "$FEATURE_DIR" ]; then
  FEATURE_DIR="specs/001-data-analysis-portfolio"
fi
ABS_FEATURE_DIR=$(pwd)/$FEATURE_DIR
FEATURE_SPEC=$ABS_FEATURE_DIR/spec.md
AVAILABLE_DOCS="[\"$FEATURE_SPEC\"]"

echo "{\"FEATURE_DIR\":\"$ABS_FEATURE_DIR\",\"AVAILABLE_DOCS\":$AVAILABLE_DOCS}"
