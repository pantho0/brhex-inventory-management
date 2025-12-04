# 📦 BRHEX Inventory Management System

A complete inventory, sales, and invoice management system designed for small to medium businesses.  
Features include barcode scanning, serial-based inventory tracking, dynamic invoice creation, PDF & POS bill generation, and advanced sales analytics.

---

## 📘 ER Diagram

The system is designed using a clean relational structure.

![BRHEX Inventory ER Diagram](./docs/er-diagram.png)

🔗 **Live Demo:** https://brhex-inventory-management-client.vercel.app/
🔗 **Requirement Analysis:** https://docs.google.com/document/d/1ZsLyhXlbE-40RM3Avk70LvFQheMPn8ZNwq12JA5oUpc/edit?usp=sharing

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

- Serial number–based tracking
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
  - A4 PDF Invoice
  - POS-size thermal bill

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
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

```bash
npm install
npm run start:dev
npm run build
npm start


```

## API Postman Collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://postman.co/workspace/My-Workspace~e3a200b6-82da-4bdb-8199-62c7e7d6092a/collection/32753226-e0bca101-1510-4df8-befa-18d38df198d4?action=share&creator=32753226&active-environment=32753226-463cd41c-98df-41c5-9b05-da4cb4b5c3df)
