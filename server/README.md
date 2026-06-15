# Medureon Pharmacy ERP Backend

A comprehensive Pharmacy ERP backend built with Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, Role-Based Access Control (RBAC), Zod Validation, Cloudinary File Uploads, PDF/Excel Export, Inventory Management, Sales Management, Reporting, and Analytics.

---

# Project Overview

Medureon Pharmacy ERP is designed to manage all core pharmacy operations from inventory and suppliers to sales, customers, invoicing, reporting, employee management, and analytics.

The system follows a modular architecture and is built to be scalable for future multi-branch and SaaS expansion.

---

# Technology Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT Authentication
- Role-Based Access Control (RBAC)

## Validation

- Zod

## File Upload

- Multer
- Cloudinary

## Export

- PDFKit
- ExcelJS

## Security

- bcryptjs
- jsonwebtoken

## Utilities

- dotenv
- cors
- helmet
- express-rate-limit

---

# Roles

## Admin

Full system access.

Can:

- Manage users
- Manage employees
- Manage inventory
- Manage suppliers
- Manage sales
- Manage reports
- Manage settings
- Manage invoices
- View analytics

---

## Manager

Can:

- Manage inventory
- Manage suppliers
- Manage customers
- Manage reports
- Manage sales
- View analytics

---

## Cashier

Can:

- Create sales
- Manage POS
- Manage customers
- Process payments

---

## Inventory Staff

Can:

- Manage stock
- Create stock-in records
- Manage product batches

---

# Folder Structure

```bash
src
│
├── app.js
├── server.js
│
├── config
│   └── cloudinary.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── validateRequest.js
│   └── upload.middleware.js
│
├── routes
│   └── index.js
│
├── modules
│
│   ├── auth
│   ├── users
│   ├── suppliers
│   ├── categories
│   ├── products
│   ├── product-batches
│   ├── inventory-transactions
│   ├── stock-ins
│   ├── customers
│   ├── sales
│   ├── invoices
│   ├── lendings
│   ├── analytics
│   ├── reports
│   ├── notifications
│   ├── audit-logs
│   ├── settings
│   ├── employees
│   ├── attendance
│   ├── uploads
│   └── exports
│
└── utils
```

---

# Database Collections

```text
users
employees

suppliers
categories
products
productbatches

inventorytransactions

stockins

customers

sales
saleitems

invoices

lendings
lendingpayments

notifications

auditlogs

settings
```

---

# Completed Modules

## Authentication Module

Features:

- User Registration
- Login
- JWT Authentication
- Password Hashing
- Protected Routes
- RBAC

---

## Supplier Management

Features:

- Create Supplier
- Update Supplier
- Delete Supplier
- Supplier Due Tracking
- Supplier Purchase History

---

## Category Management

Features:

- Category CRUD
- Soft Delete

---

## Product Management

Features:

- Product CRUD
- Barcode Support
- Category Relation
- Supplier Relation
- Product Search
- Low Stock Detection
- Expired Product Detection

---

## Product Batch Management

Features:

- Multiple batches per medicine
- Batch quantity tracking
- Expiry tracking
- FEFO support

---

## Inventory Transaction Management

Features:

Tracks every inventory movement.

Transaction Types:

- Purchase
- Sale
- Return
- Damage
- Adjustment

---

## Stock In Module

Features:

- Purchase stock
- Create batches automatically
- Update inventory
- Update supplier dues
- Create inventory transactions

Workflow:

Supplier → Stock In → Batch Creation → Inventory Update

---

## Customer Management

Features:

- Customer CRUD
- Due Tracking
- Purchase Tracking
- Loyalty Points Foundation

---

## Sales Module

Features:

- Create Sale
- FEFO Inventory Deduction
- Batch Selection
- Customer Sales
- Profit Calculation
- Due Calculation

Workflow:

Customer → Sale → Inventory Reduction → Invoice

---

## Invoice Management

Features:

- Sales Invoices
- Purchase Invoices
- Invoice Generation

---

## Lending / Credit Module

Features:

- Customer Due Records
- Installment Payments
- Payment History

---

## Analytics Module

Features:

Dashboard KPIs

- Total Revenue
- Total Profit
- Total Sales
- Low Stock Count
- Expired Product Count

Charts

- Revenue Trend
- Monthly Sales
- Top Customers
- Top Products

---

## Reports Module

Features:

- Sales Report
- Purchase Report
- Inventory Report
- Expiry Report
- Low Stock Report
- Customer Due Report
- Supplier Due Report

---

## Notifications Module

Features:

- Low Stock Alerts
- Expiry Alerts
- Due Alerts
- User Notifications

---

## Audit Log Module

Features:

Tracks:

- Create
- Update
- Delete

For all major entities.

---

## Settings Module

Features:

- Pharmacy Information
- Invoice Prefix
- Purchase Prefix
- Tax Settings
- Currency Settings
- Notification Settings

---

## Employee Module

Features:

- Employee Profiles
- Salary Information
- Designation Management
- Employee Status Tracking

---

## Attendance Module

Features:

- Check In
- Check Out
- Working Hours Tracking
- Attendance History

---

## Upload Module

Features:

- Cloudinary Integration
- Image Upload
- Document Upload
- Invoice Upload

---

## Export Module

Features:

Excel Export

- Sales
- Inventory
- Customer Dues

PDF Export

- Invoices

---

# Inventory Architecture

The system uses batch-based inventory.

```text
Product
    ↓
Product Batch
    ↓
Inventory Transaction
```

Example:

Paracetamol

Batch A001
Expiry 2027

Batch A002
Expiry 2028

Batch A003
Expiry 2029

Each batch maintains its own:

- Quantity
- Buying Price
- Selling Price
- Expiry Date

---

# FEFO Strategy

The system uses:

First Expire First Out (FEFO)

Example:

Batch A001
Expiry 2027

Batch A002
Expiry 2028

Customer buys product

↓

System deducts stock from Batch A001 first.

---

# API Prefix

```http
/api/v1
```

Example:

```http
/api/v1/products
/api/v1/sales
/api/v1/customers
```

---

# Environment Variables

```env
PORT=5000

NODE_ENV=development

DATABASE_URL=

JWT_SECRET=

JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
---

# Version

Current Version:

```text
v1.0.0-beta
```

---

# Project Name

**Medureon Pharmacy ERP**