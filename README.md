Parking Management System

Author: Mihigo Prince
Email: mihigojordan8@gmail.com

Description

This project is a Parking Management System built with Node.js, Express, and MySQL. It allows:

Parking managers to record vehicle entry and exit.

Automatic calculation of parking duration and fees.

Track active parking and view parking history.

Generate daily and monthly reports.

Normal users can view their own parking history and total fees.

The system uses JWT authentication with role-based access control:

ParkingManager: Full CRUD and reporting

Driver/User: View own parking records

Features

Record parking entry and exit with timestamps

Automatic parking fee calculation (1500 RWF first hour, 1000 RWF per additional hour)

Active parking tracking

Daily and monthly reports generation

Vehicle management CRUD

User authentication via JWT

Role-based authorization

Technologies Used

Node.js

Express.js

MySQL

JWT for authentication

bcryptjs for password hashing

Installation & Setup

Clone the repository:

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
│ ├── parking.controller.js
│ ├── user.controller.js
│ └── vehicle.controller.js
├── models/
│ ├── parking.model.js
│ ├── user.model.js
│ └── vehicle.model.js
├── routes/
│ ├── parking.routes.js
│ ├── user.routes.js
│ └── vehicle.routes.js
├── middlewares/
│ └── auth.middleware.js
├── config/
│ └── db.config.js
├── .env
├── package.json
└── server.js

Usage

Parking Managers can perform CRUD on vehicles and parking records.
Drivers can view their own parking history.
API endpoints are protected via JWT tokens.

API Endpoints
Authentication
Method Endpoint Description Roles Allowed
POST /auth/login Login user and get JWT token All
User Management

Only ParkingManager can manage users

Method Endpoint Description Roles Allowed
POST /api/users Create a new user ParkingManager
GET /api/users Get all users ParkingManager
GET /api/users/:id Get user by ID ParkingManager
PUT /api/users/:id Update user info ParkingManager
DELETE /api/users/:id Delete a user ParkingManager
Vehicle Management

Only ParkingManager can manage vehicles

Method Endpoint Description Roles Allowed
POST /api/vehicles Create a new vehicle ParkingManager
GET /api/vehicles Get all vehicles ParkingManager
GET /api/vehicles/:id Get vehicle by ID ParkingManager
PUT /api/vehicles/:id Update vehicle info ParkingManager
DELETE /api/vehicles/:id Delete a vehicle ParkingManager
Parking Management
ParkingManager Routes
Method Endpoint Description Roles Allowed
POST /api/parking/entry Record vehicle entry ParkingManager
POST /api/parking/exit Record vehicle exit ParkingManager
GET /api/parking/active View all active parking ParkingManager
GET /api/parking/vehicle/:id View history of a specific vehicle ParkingManager
GET /api/parking/report/daily Daily report of parking fees ParkingManager
GET /api/parking/report/monthly Monthly report of parking fees ParkingManager
Driver/User Routes
Method Endpoint Description Roles Allowed
GET /api/parking/user/history View parking history for their vehicles Driver, ParkingManager
Test Endpoint
Method Endpoint Description Roles Allowed
GET /api/ Test API status All

✅ Notes

All endpoints are protected with verifyToken.

Role-based authorization is applied with authorizeRoles('ParkingManager') or 'Driver'.

Reports can be filtered by vehicle or date if needed.
