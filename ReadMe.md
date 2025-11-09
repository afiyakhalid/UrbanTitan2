# 🏗️ Construction Marketplace Platform

A B2B marketplace web application connecting **manufacturers** and **buyers** of construction and industrial materials.  
Manufacturers can onboard, verify their businesses (KYC, GST, etc.), and list products, while buyers can browse, request quotations, and place orders — all in one platform.

---

## 🚀 Objective

Digitize and simplify the **procurement process** for construction and industrial materials in **Bangalore**.  
The platform allows verified manufacturers to list their products and buyers to compare, quote, and order them securely online.

---

## 🧩 Key Features

### 🏭 For Manufacturers
- Onboarding with KYC and GST verification
- Manage catalog: add, edit, or remove products
- Manage quotations, orders, and payments
- View sales analytics and reviews

### 👷‍♂️ For Buyers
- Browse and filter products by category and attributes
- Request custom quotations
- Add items to cart and complete secure payments
- View reviews, ratings, and product comparisons

---

## 🧠 Architecture Overview

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | React.js | Interactive user interface for buyers and manufacturers |
| **Backend** | Spring Boot | RESTful APIs, business logic, authentication, payments |
| **Database (SQL)** | PostgreSQL | Structured data: users, orders, quotations, payments |
| **Database (NoSQL)** | MongoDB | Hierarchical & flexible data: product categories, metadata |
| **Cache (Optional)** | Redis | Session management, fast lookups |
| **Payment Gateway** | Razorpay / Stripe | Secure online transactions |
| **Cloud Storage** | AWS S3 / GCP | Image & document storage |

---

## ⚙️ System Design

### 🗂 Hybrid Data Storage
- **PostgreSQL** → Structured, relational data (users, orders, quotations, payments)
- **MongoDB** → Flexible category and product structures (nested hierarchies, dynamic attributes)

### 🧱 Example Category Structure
```json
{
  "name": "Construction",
  "subcategories": [
    {
      "name": "Bricks and Blocks",
      "subcategories": [
        { "name": "Red Bricks" },
        { "name": "AAC Blocks" }
      ]
    }
  ]
} 


construction-marketplace/
│
├── backend/
│   ├── src/main/java/com/marketplace/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── model/
│   │   ├── repository/
│   │   └── config/
│   └── src/main/resources/
│       ├── application.yml
│       └── data/categories.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── public/
│
└── README.md
```
---

## 🧾 License
This project is currently under proprietary development — © 2025 Uzair Hasan and Khadija Parveez.
All rights reserved. Redistribution or reproduction without permission is prohibited.