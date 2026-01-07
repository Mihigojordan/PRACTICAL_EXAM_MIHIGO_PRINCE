# Parking Management System

**Author:** Mihigo Prince  
**Email:** mihigojordan8@gmail.com

---

## Description

This project is a **Parking Management System** built with Node.js, Express, and MySQL. It allows:

- Parking managers to record vehicle entry and exit.
- Automatic calculation of parking duration and fees.
- Track active parking and view parking history.
- Generate daily and monthly reports.
- Normal users can view their own parking history and total fees.

The system uses JWT authentication with role-based access control:

- **ParkingManager**: Full CRUD and reporting
- **Driver/User**: View own parking records

---

## Features

1. Record parking entry and exit with timestamps
2. Automatic parking fee calculation (1500 RWF first hour, 1000 RWF per additional hour)
3. Active parking tracking
4. Daily and monthly reports generation
5. Vehicle management CRUD
6. User authentication via JWT
7. Role-based authorization

---

## Technologies Used

- Node.js
- Express.js
- MySQL
- JWT for authentication
- bcryptjs for password hashing

---

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/mihigo-prince/parking-management.git
cd parking-management


Install dependencies:

npm install


Configure environment variables:

Create a .env file:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=parking_db
JWT_SECRET=your_secret_key


Setup database:

Create MySQL database: parking_db

Run SQL scripts to create tables: users, vehicles, parking_records

Start server:

npm start


Test API endpoints using Postman or Thunder Client.

Project Structure
.
├── controllers/
│   ├── parking.controller.js
│   ├── user.controller.js
│   └── vehicle.controller.js
├── models/
│   ├── parking.model.js
│   ├── user.model.js
│   └── vehicle.model.js
├── routes/
│   ├── parking.routes.js
│   ├── user.routes.js
│   └── vehicle.routes.js
├── middlewares/
│   └── auth.middleware.js
├── config/
│   └── db.config.js
├── .env
├── package.json
└── server.js

Usage

Parking Managers can perform CRUD on vehicles and parking records.

Drivers can view their own parking history.

API endpoints are protected via JWT tokens.

GitHub Repository

Parking Management System Repository
```
