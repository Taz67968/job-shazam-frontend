#!/bin/bash

# Navigate to project root
cd ~/Rebase_projects\ starting_From\ js/Project-Phase/job-shazam-frontend

echo "🔍 Starting Next.js Route Verification"

# 1. Check required files exist
echo "✅ Checking required files:"
[ -f "src/app/layout.tsx" ] && echo "  - src/app/layout.tsx exists" || echo "❌ Missing src/app/layout.tsx"
[ -f "src/app/page.tsx" ] && echo "  - src/app/page.tsx exists" || echo "❌ Missing src/app/page.tsx"

# 2. Verify all route directories
echo "🔎 Checking route structure:"
routes=("login" "register" "jobs" "jobs-details/[id]" "track-applications" "contact")
for route in "${routes[@]}"; do
  if [ -f "src/app/${route}/page.tsx" ]; then
    echo "  - ${route}/page.tsx exists"
    
    # Check for 'use client' directive
    if grep -q ""use client"" "src/app/${route}/page.tsx"; then
      echo "    - Has "use client" directive"
    else
      echo "    ⚠️ Missing "use client" directive"
    fi
    
    # Check basic export
    if grep -q "export default function" "src/app/${route}/page.tsx"; then
      echo "    - Has default export"
    else
      echo "    ⚠️ Missing default export"
    fi
  else
    echo "❌ Missing src/app/${route}/page.tsx"
  fi
done

# 3. Check API routes
echo "🌐 Checking API routes:"
if [ -d "src/app/api" ]; then
  find src/app/api -name "route.ts" | while read -r api_route; do
    echo "  - Found API route: ${api_route}"
    
    # Check for proper HTTP methods
    if grep -q "GET\\|POST\\|PUT\\|DELETE" "$api_route"; then
      echo "    - Has HTTP method handlers"
    else
      echo "    ⚠️ Missing HTTP method handlers"
    fi
  done
else
  echo "  - No API routes found"
fi

# 4. Verify next.config.js
echo "⚙️ Checking next.config.js:"
if [ -f "next.config.js" ]; then
  echo "  - next.config.js exists"
  
  # Check for redirects
  if grep -q "redirects" "next.config.js"; then
    echo "    - Has redirects configuration"
  else
    echo "    ⚠️ Missing redirects configuration"
  fi
  
  # Check for images config
  if grep -q "images:" "next.config.js"; then
    echo "    - Has images configuration"
  else
    echo "    ⚠️ Missing images configuration"
  fi
else
  echo "❌ Missing next.config.js"
fi

# 5. Check for conflicting files
echo "🚨 Checking for conflicts:"
if [ -d "src/pages" ]; then
  echo "⚠️ Warning: src/pages directory exists (may conflict with app router)"
  find src/pages -name "*.tsx" | while read -r page; do
    echo "  - Found legacy page: ${page}"
  done
fi

# 6. Final verification
echo "🚦 Verification complete!"
echo "Next steps:"
echo "- Fix any ❌ or ⚠️ items above"
echo "- Run 'npm run dev' and test routes manually"
echo "- Check browser console for errors"

# Create verification report
echo "📄 Creating verification_report.txt..."
{
  echo "Route Verification Report"
  echo "Generated: $(date)"
  echo "========================="
  echo "App Router Structure:"
  find src/app -name "page.tsx" | sort | sed 's/^/  - /'
  echo ""
  echo "Missing 'use client' Directives:"
  grep -L "'use client'" $(find src/app -name "page.tsx") | sed 's/^/  - /'
  echo ""
  echo "Configuration Issues:"
  [ ! -f "next.config.js" ] && echo "  - Missing next.config.js"
  grep -L "redirects" next.config.js 2>/dev/null | sed 's/^/  - Missing redirects in /'
} > verification_report.txt

echo "✅ Report saved to verification_report.txt"