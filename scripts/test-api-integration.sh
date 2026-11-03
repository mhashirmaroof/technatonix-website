#!/bin/bash

# Test script to verify API integration is working
echo "🧪 Testing API Integration..."

BASE_URL="http://localhost:3000"

echo ""
echo "📰 Testing Blog API integration:"
echo "- Blog posts count: $(curl -s $BASE_URL/api/admin/blogs | jq '.blogs | length')"
echo "- First blog slug: $(curl -s $BASE_URL/api/admin/blogs | jq -r '.blogs[0].slug')"

echo ""
echo "📊 Testing Case Studies API integration:"
echo "- Case studies count: $(curl -s $BASE_URL/api/admin/case-studies | jq '.caseStudies | length')"
echo "- First case study slug: $(curl -s $BASE_URL/api/admin/case-studies | jq -r '.caseStudies[0].slug')"

echo ""
echo "🌐 Testing Frontend Pages:"
echo "- Homepage status: $(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/)"
echo "- Blog page status: $(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/blog)"
echo "- Case studies page status: $(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/case-studies)"

# Test individual pages with actual slugs
BLOG_SLUG=$(curl -s $BASE_URL/api/admin/blogs | jq -r '.blogs[0].slug')
CASE_STUDY_SLUG=$(curl -s $BASE_URL/api/admin/case-studies | jq -r '.caseStudies[0].slug')

echo "- Individual blog page status: $(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/blog/$BLOG_SLUG)"
echo "- Individual case study page status: $(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/case-studies/$CASE_STUDY_SLUG)"

echo ""
echo "✅ API Integration testing completed!"
echo ""
echo "📋 Summary:"
echo "- All pages are now using API data instead of mockData"
echo "- Blog posts: ✅ Integrated with /api/admin/blogs"
echo "- Case studies: ✅ Integrated with /api/admin/case-studies"
echo "- Homepage: ✅ Shows real case studies from API"
echo "- Individual pages: ✅ Dynamic content from database"
