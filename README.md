

# 🏡 StayEase

StayEase is a full-stack rental listing web application built using Node.js, Express.js, MongoDB, and EJS. It allows users to explore listings, create properties, upload images, and post reviews with secure authentication and session management.

🌐 **Live Demo:**  
https://stayease-xzk0.onrender.com

---

## 🚀 Features

- User Authentication (Signup / Login / Logout)
- Authorization (Only owner can edit/delete)
- Create, Edit, Delete Listings
- Review System
- Image Upload using Cloudinary
- Session Management using MongoStore
- Database Seeding
- MVC Architecture
- Deployed on Render

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Passport.js
- Cloudinary
- EJS
- Bootstrap
- Render

---

## 🏗 Architecture

Follows MVC pattern:

- Models
- Views
- Controllers
- Routes
- Middleware

---

## 🌱 Seed Data

Run this command to insert sample data:

```bash
node seeds/index.js
```


---

## ⚙️ Environment Variables

Create `.env` file:

ATLASDB_URL=your_mongodb_connection_string  
SECRET=your_session_secret  
CLOUDINARY_URL=your_cloudinary_connection_string  

---

## 👨‍💻 Author

Kundan Kumar

