🚀 PulseCRM Backend

A secure, scalable backend API for PulseCRM — a MERN-based Customer Relationship Management system.

This backend handles authentication, user management, leads & customers CRUD operations, with full JWT-based authorization.

📌 Features
🔐 Authentication & Security

JWT-based secure login & signup

Password encryption using bcryptjs

Protected routes using middleware

Auto token verification

👥 CRM Core Features

Manage Leads (Create, Read, Update, Delete)

Manage Customers

Dashboard statistics

Profile management (name, email, avatar)

⚙️ API Architecture

Modular folder structure

Controllers + Routes separation

Async/await error handling

MongoDB with Mongoose

CORS-enabled for frontend access

🛠 Tech Stack
Layer	Tech
Runtime	Node.js
Framework	Express.js
Database	MongoDB + Mongoose
Auth	JWT, Bcrypt
Tools	Nodemon, dotenv, CORS
📁 Folder Structure
PulseCRM-Backend/
 ├── controllers/     # Route logic (auth, leads, customers)
 ├── middleware/      # Auth middleware (JWT protect)
 ├── models/          # Mongoose schemas
 ├── routes/          # All API endpoints
 ├── config/          # DB connection
 ├── server.js        # App entry point
 └── .env.example     # Example environment variables

🚀 Getting Started (Run Backend Locally)
1️⃣ Clone the backend repo
git clone https://github.com/HarshitYadav05/PulseCRM-Backend.git
cd PulseCRM-Backend

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file

Inside the root folder, create a file named .env:

MONGO_URI=your_mongo_database_url
JWT_SECRET=your_secret_key
PORT=5000


⚠️ Do NOT push your real .env file to GitHub.

4️⃣ Start the backend server
npm run server


If successful, you will see:

MongoDB Connected
Server running on port 5000

📌 Important API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/login	Login user
POST	/api/auth/register	Register user
Leads
Method	Endpoint
GET	/api/leads
POST	/api/leads
Customers
Method	Endpoint
GET	/api/customers
POST	/api/customers

(Protected endpoints require a Bearer token)

🧪 Testing With Postman

Import routes and test authentication + CRUD.

Example header:

Authorization: Bearer <your_token_here>

📝 Future Enhancements

Role-based access (Admin, User)

Activity logs

File uploads (customer documents)

Email notifications

👤 Author

Harshit Raj Yadav

Backend Developer | MERN Stack Enthusiast

⭐ If this project helped you, consider giving the repo a star!
