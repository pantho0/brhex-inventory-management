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

## 💻 Tech Stack

This system is built using the **T3 stack** principles, utilizing **TypeScript** for robust type safety and **Next.js** for full-stack functionality.

### Core Technologies

| Component          | Technologies Used         |
| :----------------- | :------------------------ |
| **Framework**      | Next.js (Full-stack)      |
| **Language**       | TypeScript                |
| **Database**       | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT)     |

### Tools & Libraries

|                                                                                                                                                |                                                                                                                                                      |                                                                                                                                      |
| :--------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
|       [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)        | [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) |
|      [![Mongoose](https://img.shields.io/badge/Mongoose-800?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)       |              [![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)               |     [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)     |
| [![PDF-LIB](https://img.shields.io/badge/PDF_Lib-E6231E?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://pdf-lib.js.org/) |    [![JSBarcode](https://img.shields.io/badge/JSBarcode-40A0ED?style=for-the-badge&logo=barcode&logoColor=white)](https://lindell.me/jsbarcode/)     | [![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/) |

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

<p align="center">
  <img src="https://img.shields.io/badge/ACTION%20REQUIRED-Create%20a%20.env%20file%20and%20follow%20.env.example-red?style=for-the-badge&labelColor=black"/>
</p>

### 🔑 Default Admin Credentials

Upon initial clone and setup, a default admin user will be automatically created for immediate login:

| Field        | Value             |
| :----------- | :---------------- |
| **Email**    | `admin@brhex.com` |
| **Password** | `Brhex@123`       |

---

## 📥 Clone the Repository

```bash
git clone [https://github.com/pantho0/brhex-inventory-management.git](https://github.com/pantho0/brhex-inventory-management.git)
cd your-repo-name

npm install
npm run start:dev
npm run start:prod
```
