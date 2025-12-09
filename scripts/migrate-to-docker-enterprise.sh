#!/bin/bash
set -e

echo "🚀 Migrating to Docker Enterprise"

ORIGINAL="github.com/chadbercea/ai-design-system"
DOCKER="github.docker.com/design-system-token-pipeline"

# Update doc URLs
find . -type f -name "*.md" \
  -not -path "./node_modules/*" \
  -exec sed -i '' "s|$ORIGINAL|$DOCKER|g" {} +

echo "✅ URLs updated"
echo ""
echo "Next steps:"
echo "1. git add -A"
echo "2. git commit -m 'docs: update URLs for Docker enterprise'"
echo "3. git remote add docker https://$DOCKER.git"
echo "4. git push docker main"

