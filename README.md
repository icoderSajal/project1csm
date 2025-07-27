# 🚢 Cruise Ship Management System

The **Cruise Ship Management System** is a full-featured web application built to streamline the operations and services aboard a cruise ship. It offers role-based modules including Admin, Manager, Head Cook, Supervisor, and Voyager. The system enables users to manage and book amenities like movie tickets, salons, party halls, catering, and more.

## 📌 Project Features

### 🛠️ ADMIN Module

The Admin has full access and control over the following sub-modules:

1. **Profile** – Manage admin personal and credential information.
2. **Department Management** – Create, add, and delete departments.
3. **User Registration** – Create and manage users by department.
4. **Menus** – Create, edit, and delete catering menus.
5. **Items** – Add items under the respective menus.
6. **Movie Tickets** – Create and list movies for ticket booking.
7. **Salon** – Create, edit, and delete salon services.
8. **Party Hall** – Create, manage, and update party hall details.
9. **Orders** – View and manage all catering and stationery orders.

### 👨‍💼 MANAGER Module

Managers can perform the following actions:

- View booked **movie tickets** (resort).
- View booked **beauty salon** appointments.
- View booked **fitness center** activities.
- View booked **party halls**.

### 👨‍🍳 HEAD-COOK Module

- View **ordered catering items** by voyagers.

### 👷 SUPERVISOR Module

- View **ordered stationery items** by voyagers.

### 🧍 VOYAGER Module

Voyagers can perform the following:

- Sign in with a username and password.
- Order **catering items**.
- Order **stationery items**.
- Book **movie tickets** (resort).
- Book **beauty salon** appointments.
- Book **fitness center** activities.
- Book **party halls**.

## 🚀 Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based login system

## 📂 Project Structure
```
## for Register admin by backedn
use api --http://localhost:8000/api/v1/auth/register
and the use data is
{

    "name":"admin", "email":"admin@admin.com", "password":"admin", "role":"admin"
}
```

```
/client         → React frontend (UI)
/server         → Express backend (API)
/models         → MongoDB Schemas
/routes         → RESTful APIs
/controllers    → Business logic
/utils          → Utilities (auth, encryption)
.env            → Environment variables
README.md       → Project documentation
```

## 🧪 Development & Deployment

```bash
# Clone the repository
git clone https://github.com/your-username/cruise-ship-management.git

# Navigate to the backend
cd server
npm install
npm run dev

# Navigate to the frontend
cd client
npm install
npm run dev
```

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License.

---

**Developed with ❤️ to make your cruise ship operations seamless.**
