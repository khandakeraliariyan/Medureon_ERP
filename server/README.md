# Medureon Pharmacy ERP Backend API

This document describes the backend API for Medureon ERP. The server is built with Node.js, Express, MongoDB, Mongoose, JWT authentication, role-based access control, Zod validation, and file export support.

Base URL:

```text
http://localhost:5000/api/v1
```

If the server is running locally, you can test all endpoints under this prefix.

---

## 1. Getting Started

### Install dependencies

```bash
cd server
npm install
```

### Start the server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

### Health check

```http
GET /
```

Example response:

```json
{
  "success": true,
  "message": "Pharmacy ERP API Running"
}
```

---

## 2. Authentication

Most endpoints require a JWT token in the Authorization header.

```http
Authorization: Bearer <your-token>
```

### Roles

- admin: full access
- manager: inventory, sales, reports, customers, analytics
- cashier: sales, invoices, customers, lendings
- inventory: stock, inventory, product updates

### Common response format

Successful responses usually return:

```json
{
  "success": true,
  "data": {}
}
```

Error responses look like:

```json
{
  "success": false,
  "message": "Description of the error"
}
```

---

## 3. Auth APIs

### Register a new user

```http
POST /auth/register
```

Body:

```json
{
  "name": "Ariyan",
  "email": "ariyan@example.com",
  "password": "123456",
  "role": "manager"
}
```

Allowed roles:
- admin
- manager
- cashier
- inventory

### Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "ariyan@example.com",
  "password": "123456"
}
```

### Get current user profile

```http
GET /auth/me
```

### Change password

```http
PATCH /auth/change-password
```

Body:

```json
{
  "oldPassword": "oldpass",
  "newPassword": "newpass123"
}
```

### List users

```http
GET /auth/users
```

Accessible by: admin, manager

### Update user role

```http
PATCH /auth/users/:id/role
```

Accessible by: admin

---

## 4. Category APIs

### Create category

```http
POST /categories
```

Body:

```json
{
  "name": "Antibiotics",
  "description": "Prescription medicines",
  "status": "active"
}
```

### List categories

```http
GET /categories
```

### Get one category

```http
GET /categories/:id
```

### Update category

```http
PATCH /categories/:id
```

### Delete category

```http
DELETE /categories/:id
```

---

## 5. Supplier APIs

### Create supplier

```http
POST /suppliers
```

Body:

```json
{
  "name": "ABC Pharma",
  "companyName": "ABC Pharmaceuticals",
  "email": "supplier@example.com",
  "phone": "01700000000",
  "address": "Dhaka",
  "status": "active"
}
```

### List suppliers

```http
GET /suppliers
```

### Get supplier by id

```http
GET /suppliers/:id
```

### Update supplier

```http
PATCH /suppliers/:id
```

### Delete supplier

```http
DELETE /suppliers/:id
```

---

## 6. Product APIs

### Create product

```http
POST /products
```

Body:

```json
{
  "name": "Paracetamol 500mg",
  "genericName": "Paracetamol",
  "brand": "MediCare",
  "category": "category-id",
  "supplier": "supplier-id",
  "barcode": "123456789",
  "sku": "SKU-001",
  "batchNumber": "BATCH-001",
  "expiryDate": "2026-12-31",
  "buyingPrice": 20,
  "sellingPrice": 30,
  "reorderLevel": 10,
  "unit": "box"
}
```

### List products

```http
GET /products
```

### Get product by id

```http
GET /products/:id
```

### Update product

```http
PATCH /products/:id
```

### Delete product

```http
DELETE /products/:id
```

### Low stock products

```http
GET /products/inventory/low-stock
```

### Expired products

```http
GET /products/inventory/expired
```

### Products expiring soon

```http
GET /products/inventory/expiring-soon
```

### Get product by barcode

```http
GET /products/barcode/:barcode
```

---

## 7. Product Batch APIs

### Create batch

```http
POST /batches
```

### List batches

```http
GET /batches
```

### Get batch by id

```http
GET /batches/:id
```

### Update batch

```http
PATCH /batches/:id
```

### Delete batch

```http
DELETE /batches/:id
```

---

## 8. Inventory Transaction APIs

### Create inventory transaction

```http
POST /inventory-transactions
```

Body example:

```json
{
  "product": "product-id",
  "batch": "batch-id",
  "type": "purchase",
  "quantity": 10,
  "note": "Stock added"
}
```

### List transactions

```http
GET /inventory-transactions
```

### Get one transaction

```http
GET /inventory-transactions/:id
```

### Get transaction history for a product

```http
GET /inventory-transactions/product/:productId
```

### Get transaction history for a batch

```http
GET /inventory-transactions/batch/:batchId
```

---

## 9. Stock In APIs

### Create stock in record

```http
POST /stock-ins
```

Body example:

```json
{
  "supplier": "supplier-id",
  "items": [
    {
      "product": "product-id",
      "batchNumber": "B1",
      "expiryDate": "2026-12-31",
      "quantity": 20,
      "buyingPrice": 15,
      "sellingPrice": 25
    }
  ],
  "totalAmount": 300,
  "paidAmount": 300,
  "note": "Initial stock"
}
```

### List stock-in records

```http
GET /stock-ins
```

### Get one stock-in record

```http
GET /stock-ins/:id
```

---

## 10. Customer APIs

### Create customer

```http
POST /customers
```

Body:

```json
{
  "name": "Rahim",
  "phone": "01812345678",
  "email": "rahim@example.com",
  "address": "Chittagong",
  "creditLimit": 5000
}
```

### List customers

```http
GET /customers
```

### Get customers with dues

```http
GET /customers/due
```

### Get customer by id

```http
GET /customers/:id
```

### Update customer

```http
PATCH /customers/:id
```

### Delete customer

```http
DELETE /customers/:id
```

---

## 11. Sale APIs

### Create sale

```http
POST /sales
```

Body example:

```json
{
  "customer": "customer-id",
  "items": [
    {
      "product": "product-id",
      "quantity": 2
    }
  ],
  "discount": 10,
  "tax": 5,
  "paidAmount": 50,
  "paymentMethod": "cash"
}
```

### List sales

```http
GET /sales
```

### Get customer sales

```http
GET /sales/customer/:customerId
```

### Get sale by id

```http
GET /sales/:id
```

---

## 12. Invoice APIs

### Create invoice

```http
POST /invoices
```

Body example:

```json
{
  "invoiceType": "sale",
  "sale": "sale-id"
}
```

### List invoices

```http
GET /invoices
```

### Get invoice by id

```http
GET /invoices/:id
```

---

## 13. Lending APIs

### Create lending

```http
POST /lendings
```

Body:

```json
{
  "customer": "customer-id",
  "sale": "sale-id",
  "originalAmount": 1000,
  "notes": "Installment plan"
}
```

### Pay installment

```http
POST /lendings/:id/pay
```

Body:

```json
{
  "amount": 250,
  "paymentMethod": "cash",
  "note": "First installment"
}
```

### List lendings

```http
GET /lendings
```

### Get lending by id

```http
GET /lendings/:id
```

---

## 14. Analytics APIs

### Dashboard summary

```http
GET /analytics/dashboard
```

### Monthly sales

```http
GET /analytics/monthly-sales
```

### Top customers

```http
GET /analytics/top-customers
```

### Top products

```http
GET /analytics/top-products
```

### Revenue trend

```http
GET /analytics/revenue-trend
```

---

## 15. Audit Log APIs

### List audit logs

```http
GET /audit-logs
```

### Get one audit log

```http
GET /audit-logs/:id
```

### Get module history

```http
GET /audit-logs/module/:module
```

### Get user activity

```http
GET /audit-logs/user/:userId
```

---

## 16. Notification APIs

### List notifications

```http
GET /notifications
```

### Get unread count

```http
GET /notifications/unread-count
```

### Mark notification as read

```http
PATCH /notifications/:id/read
```

### Mark all notifications as read

```http
PATCH /notifications/read-all
```

### Delete notification

```http
DELETE /notifications/:id
```

---

## 17. Settings APIs

### Get settings

```http
GET /settings
```

### Update settings

```http
PATCH /settings
```

Body example:

```json
{
  "pharmacyName": "Medureon Pharmacy",
  "currency": "BDT",
  "lowStockThreshold": 10
}
```

---

## 18. Report APIs

### Sales report

```http
GET /reports/sales
```

### Purchase report

```http
GET /reports/purchases
```

### Inventory report

```http
GET /reports/inventory
```

### Low stock report

```http
GET /reports/low-stock
```

### Expiry report

```http
GET /reports/expiry
```

### Customer dues report

```http
GET /reports/customer-dues
```

### Supplier dues report

```http
GET /reports/supplier-dues
```

---

## 19. Upload APIs

### Upload a single file

```http
POST /uploads/single
```

Use form-data with a field named file.

### Delete uploaded file

```http
DELETE /uploads/:publicId
```

---

## 20. Export APIs

### Export sales to Excel

```http
GET /exports/sales-excel
```

### Export inventory to Excel

```http
GET /exports/inventory-excel
```

### Export customer due report to Excel

```http
GET /exports/customer-due-excel
```

---

## 21. Employee APIs

### Create employee

```http
POST /employees
```

### List employees

```http
GET /employees
```

### Get employee by id

```http
GET /employees/:id
```

### Update employee

```http
PATCH /employees/:id
```

### Delete employee

```http
DELETE /employees/:id
```

---

## 22. Attendance APIs

### Check in

```http
POST /attendance/check-in
```

Body:

```json
{
  "employee": "employee-id"
}
```

### Check out

```http
POST /attendance/check-out
```

Body:

```json
{
  "employee": "employee-id"
}
```

### Get attendance records

```http
GET /attendance
```

### Get employee attendance

```http
GET /attendance/employee/:employeeId
```

---

## 23. Notes for Developers

- All routes are mounted under /api/v1.
- Authentication is required for almost all modules.
- Validation is handled with Zod schemas.
- Role-based authorization is enforced with the role middleware.
- File uploads are handled through Cloudinary.
- Export files are generated using Excel and related libraries.

If you want, this documentation can be expanded further with example response payloads for every endpoint.

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