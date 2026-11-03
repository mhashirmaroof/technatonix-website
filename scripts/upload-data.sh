#!/bin/bash

# Upload hardcoded data to database via API
echo "🚀 Starting data upload to database..."

# Base URL
BASE_URL="http://localhost:3000"

echo "📝 Uploading Case Studies..."

# Case Study 1: KREVIX ERP Manufacturing
curl -X POST "$BASE_URL/api/admin/case-studies" \
-H "Content-Type: application/json" \
-d '{
  "title": "KREVIX ERP - Complete Manufacturing Management System",
  "clientName": "Technatonix",
  "clientLogo": "/images/clients/technatonix-logo.jpg",
  "problem": "Manufacturing companies struggled with disconnected systems for inventory, production planning, and quality control, leading to inefficiencies and increased operational costs.",
  "solution": "Developed KREVIX ERP as a comprehensive, inventory-first ERP solution specifically designed for manufacturers, featuring real-time tracking, automated reordering, and integrated quality management.",
  "results": "Successfully deployed across 500+ manufacturing facilities, achieving significant improvements in operational efficiency and cost reduction.",
  "metrics": [
    {"label": "Manufacturing Clients", "value": "500+", "description": "Active installations"},
    {"label": "Industries Served", "value": "15+", "description": "Different manufacturing sectors"},
    {"label": "System Uptime", "value": "99.9%", "description": "Guaranteed availability"}
  ],
  "techStack": ["Angular", "Node.js", "NestJS", "MongoDB", "PostgreSQL", "AM Charts", "Barcode Scanners", "RFID Scanner", "Payment Integration"],
  "images": ["/images/case-study-krevix-1.jpg"],
  "tags": ["ERP", "Manufacturing", "Inventory", "Production"],
  "published": true
}'

echo ""

# Case Study 2: Peace Giving Platform
curl -X POST "$BASE_URL/api/admin/case-studies" \
-H "Content-Type: application/json" \
-d '{
  "title": "Peace Giving - Donation Platform",
  "clientName": "Mercy to Humanity UK",
  "clientLogo": "/images/clients/mercy-to-humanity-logo.jpg",
  "problem": "Traditional donation methods were inefficient and lacked transparency, making it difficult for donors to track their contributions and for the organization to manage fundraising campaigns effectively.",
  "solution": "Developed Peace Giving, a comprehensive donation platform with secure payment processing, real-time campaign tracking, donor management, and transparent fund allocation reporting.",
  "results": "Transformed the organizations fundraising capabilities with improved donor engagement and streamlined campaign management.",
  "metrics": [
    {"label": "Donation Processing", "value": "99.8%", "description": "Success rate"},
    {"label": "Campaign Management", "value": "85%", "description": "Efficiency improvement"},
    {"label": "Donor Retention", "value": "78%", "description": "Increased retention rate"}
  ],
  "techStack": ["React", "Node.js", "Express", "MongoDB", "Stripe", "PayPal", "JWT", "Material-UI"],
  "images": ["/images/case-study-peacegiving-1.jpg"],
  "tags": ["Donation", "Payment Processing", "Campaign Management"],
  "published": true
}'

echo ""

# Case Study 3: LinenIQ RFID Management
curl -X POST "$BASE_URL/api/admin/case-studies" \
-H "Content-Type: application/json" \
-d '{
  "title": "LinenIQ - RFID Linen Management System",
  "clientName": "Hospitality & Healthcare Industries",
  "clientLogo": "/images/clients/lineniq-logo.jpg",
  "problem": "Hotels and healthcare facilities faced significant challenges in tracking linen inventory, leading to high losses, inefficient par level management, and operational disruptions.",
  "solution": "Developed LinenIQ, an RFID-enabled cloud-based linen management system with real-time tracking, mobile app integration, and automated inventory management for hospitality and healthcare industries.",
  "results": "Revolutionized linen management for facilities worldwide with significant improvements in tracking accuracy and cost reduction.",
  "metrics": [
    {"label": "Tracking Accuracy", "value": "87%", "description": "Improvement in accuracy"},
    {"label": "Linen Loss Reduction", "value": "78%", "description": "Reduced operational losses"},
    {"label": "Par Level Maintenance", "value": "88%", "description": "Optimal inventory levels"}
  ],
  "techStack": ["React", "Node.js Sockets", "PHP Laravel", "SQL", "Ant Design", "Apex Charts", "RFID Technology"],
  "images": ["/images/case-study-lineniq-1.jpg"],
  "tags": ["RFID", "Inventory Management", "Healthcare", "Hospitality"],
  "published": true
}'

echo ""

# Case Study 4: MetrixPlus Enterprise Governance
curl -X POST "$BASE_URL/api/admin/case-studies" \
-H "Content-Type: application/json" \
-d '{
  "title": "MetrixPlus - Enterprise Governance Platform",
  "clientName": "Large Enterprise Organizations",
  "clientLogo": "/images/clients/metrixplus-logo.jpg",
  "problem": "Large organizations struggled with governance, risk management, and compliance tracking across multiple departments and processes, lacking centralized oversight and automated workflows.",
  "solution": "Developed MetrixPlus, a comprehensive enterprise governance platform with workflow automation, risk assessment tools, compliance tracking, and advanced analytics for organizational oversight.",
  "results": "Enhanced governance capabilities for enterprise clients with improved compliance tracking and streamlined approval processes.",
  "metrics": [
    {"label": "Process Automation", "value": "92%", "description": "Workflow efficiency"},
    {"label": "Compliance Tracking", "value": "95%", "description": "Accuracy improvement"},
    {"label": "Risk Assessment", "value": "89%", "description": "Faster identification"}
  ],
  "techStack": ["Angular", "Java Spring Boot", "SQL", "DevExpress", "Camunda BPMN", "Gridster2", "AM Charts"],
  "images": ["/images/case-study-metrixplus-1.jpg"],
  "tags": ["Governance", "Risk Management", "Compliance", "Enterprise"],
  "published": true
}'

echo ""
echo "✅ Case Studies uploaded successfully!"
echo ""
echo "📚 Uploading Blog Posts..."

# Blog Post 1: Modern ERP Trends
curl -X POST "$BASE_URL/api/admin/blogs" \
-H "Content-Type: application/json" \
-d '{
  "title": "Modern ERP Trends Shaping Manufacturing in 2024",
  "excerpt": "Explore the latest trends in ERP technology that are transforming how manufacturers manage their operations, from AI-powered analytics to cloud-native architectures.",
  "content": "# Modern ERP Trends Shaping Manufacturing in 2024\n\nThe manufacturing industry is experiencing a digital transformation, and ERP systems are at the forefront of this change. As we move through 2024, several key trends are emerging that are reshaping how manufacturers approach their enterprise resource planning needs.\n\n## 1. AI-Powered Analytics and Predictive Insights\n\nModern ERP systems are increasingly incorporating artificial intelligence to provide predictive analytics and automated decision-making capabilities. This includes:\n\n- Demand forecasting based on historical data and market trends\n- Predictive maintenance scheduling\n- Automated inventory optimization\n- Quality prediction and defect prevention\n\n## 2. Cloud-Native Architecture\n\nThe shift to cloud-native ERP solutions continues to accelerate, offering manufacturers:\n\n- Improved scalability and flexibility\n- Reduced IT infrastructure costs\n- Enhanced security and compliance\n- Faster deployment and updates\n\n## 3. Real-Time Data Integration\n\nModern manufacturers require real-time visibility across their operations. ERP systems are evolving to provide:\n\n- IoT device integration for real-time monitoring\n- Instant data synchronization across departments\n- Real-time reporting and dashboards\n- Immediate alerts and notifications\n\n## Conclusion\n\nAs these trends continue to evolve, manufacturers who embrace modern ERP technologies will gain significant competitive advantages in efficiency, cost reduction, and customer satisfaction.",
  "author": "Sarah Johnson",
  "authorImage": "/images/authors/sarah-johnson.jpg",
  "featuredImage": "/images/blog/erp-trends-2024.jpg",
  "tags": ["ERP", "Manufacturing", "Technology", "Trends"],
  "publishedAt": "2024-01-15T00:00:00.000Z",
  "readTime": 5,
  "published": true
}'

echo ""

# Blog Post 2: Inventory Management Best Practices
curl -X POST "$BASE_URL/api/admin/blogs" \
-H "Content-Type: application/json" \
-d '{
  "title": "Inventory Management Best Practices for Manufacturing",
  "excerpt": "Learn proven strategies for optimizing inventory levels, reducing carrying costs, and improving operational efficiency in manufacturing environments.",
  "content": "# Inventory Management Best Practices for Manufacturing\n\nEffective inventory management is crucial for manufacturing success. Poor inventory practices can lead to increased costs, production delays, and customer dissatisfaction. Here are the best practices that leading manufacturers use to optimize their inventory operations.\n\n## 1. Implement ABC Analysis\n\nClassify your inventory into three categories:\n- A items: High-value, low-quantity items (typically 20% of items, 80% of value)\n- B items: Moderate-value, moderate-quantity items\n- C items: Low-value, high-quantity items\n\nThis classification helps prioritize management attention and resources.\n\n## 2. Use Automated Reorder Points\n\nSet up automated reorder points based on:\n- Lead times from suppliers\n- Historical consumption patterns\n- Safety stock requirements\n- Seasonal variations\n\n## 3. Optimize Safety Stock Levels\n\nCalculate safety stock based on:\n- Demand variability\n- Supply lead time variability\n- Service level targets\n- Cost of stockouts vs. carrying costs\n\n## 4. Implement Cycle Counting\n\nRegular cycle counting helps maintain inventory accuracy:\n- Count high-value items more frequently\n- Use statistical sampling for large inventories\n- Investigate and correct discrepancies immediately\n\n## Conclusion\n\nBy implementing these best practices, manufacturers can significantly reduce inventory costs while improving service levels and operational efficiency.",
  "author": "Michael Chen",
  "authorImage": "/images/authors/michael-chen.jpg",
  "featuredImage": "/images/blog/inventory-management.jpg",
  "tags": ["Inventory", "Manufacturing", "Best Practices", "Operations"],
  "publishedAt": "2024-02-01T00:00:00.000Z",
  "readTime": 7,
  "published": true
}'

echo ""
echo "✅ Blog Posts uploaded successfully!"
echo ""
echo "🔍 Testing GET requests to verify data..."
echo ""

echo "📊 Fetching Case Studies:"
curl -X GET "$BASE_URL/api/admin/case-studies" | jq .

echo ""
echo "📰 Fetching Blog Posts:"
curl -X GET "$BASE_URL/api/admin/blogs" | jq .

echo ""
echo "🎉 Data upload completed successfully!"
