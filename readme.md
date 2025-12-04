# 📦 BRHEX Inventory Management System

A complete inventory, sales, and invoice management system designed for small to medium businesses.  
Features include barcode scanning, serial-based inventory tracking, dynamic invoice creation, PDF & POS bill generation, and advanced sales analytics.

---

## 📘 ER Diagram

The system is designed using a clean relational structure.

![BRHEX Inventory ER Diagram](./docs/er-diagram.png)

🔗 **Live Demo:** https://brhex-inventory-management-client.vercel.app/

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

````bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


```bash
npm install
npm run start:dev
npm run build
npm start


````
