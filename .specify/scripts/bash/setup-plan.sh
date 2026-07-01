#!/bin/bash
# setup-plan.sh
# Prints environment variables in JSON format or standard shell formats.
FEATURE_DIR=$(cat .specify/feature.json | python3 -c "import sys, json; print(json.load(sys.stdin).get('feature_directory', ''))" 2>/dev/null)
if [ -z "$FEATURE_DIR" ]; then
  FEATURE_DIR="specs/001-data-analysis-portfolio"
fi
ABS_FEATURE_DIR=$(pwd)/$FEATURE_DIR
FEATURE_SPEC=$ABS_FEATURE_DIR/spec.md
IMPL_PLAN="/Users/mac/.gemini/antigravity/brain/59a2fb7e-efac-43e6-af14-205d1598fcf3/implementation_plan.md"
SPECS_DIR=$ABS_FEATURE_DIR
BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

if [ "$1" = "--json" ]; then
  echo "{\"FEATURE_SPEC\":\"$FEATURE_SPEC\",\"IMPL_PLAN\":\"$IMPL_PLAN\",\"SPECS_DIR\":\"$SPECS_DIR\",\"BRANCH\":\"$BRANCH\"}"
else
  echo "FEATURE_SPEC=$FEATURE_SPEC"
  echo "IMPL_PLAN=$IMPL_PLAN"
  echo "SPECS_DIR=$SPECS_DIR"
  echo "BRANCH=$BRANCH"
fi
