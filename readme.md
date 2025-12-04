# 📦 BRHEX Inventory Management System

A complete inventory, sales, and invoice management system designed for small to medium businesses.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge)](https://brhex-inventory-management-client.vercel.app/)
[![Requirement Analysis](https://img.shields.io/badge/Requirement%20Analysis-View%20Docs-lightgrey?style=for-the-badge)](https://docs.google.com/document/d/1ZsLyhXlbE-40RM3Avk70LvFQheMPn8ZNwq12JA5oUpc/edit?usp=sharing)

Features include barcode scanning, serial-based inventory tracking, dynamic invoice creation, PDF & POS bill generation, and advanced sales analytics.

---

## 📘 ER Diagram

The system is designed using a clean relational structure.

![BRHEX Inventory ER Diagram](./docs/er-diagram.png)

---

## 🚀 Features

### ✅ **User & Authentication**

- Secure JWT-based login
- Role management: `admin`, `user`
- Admin controls all modules

### 🏷️ **Category Management**

- Create, update, delete categories
- Organize products clearly

### 📦 **Product Management**

- Add/edit/delete products
- Assign categories
- Search & filter products

### 🛠️ **Inventory Management**

- **Serial number–based tracking**
- Auto update inventory status:
  - `in_stock`
  - `sold`
  - `in_warranty`
  - `returned`
- Purchase price, selling price, warranty
- Auto barcode generator for non-serial items

### 🧾 **Invoice Management**

- Add items via barcode/serial scanning
- Auto fetch inventory data
- Full invoice calculation:
  - Subtotal
  - Discount
  - Tax
  - Total
  - Paid / Due
- Payment history tracking

### 🖨️ **Invoice Output**

- Auto-generate:
  - **A4 PDF Invoice**
  - **POS-size thermal bill**

### 📊 **Dashboard Analytics**

- Daily, monthly, yearly sales charts
- Bar & line charts
- Summary cards:
  - Total Sales
  - Total Paid
  - Total Due
  - Total Invoices
  - Inventory Status

---

## 📥 Clone the Repository

```bash
git clone [https://github.com/pantho0/brhex-inventory-management.git](https://github.com/pantho0/brhex-inventory-management.git)
cd your-repo-name

npm install
npm run start:dev
npm run start:prod
```
