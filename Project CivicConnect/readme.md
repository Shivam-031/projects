# 🚀 CivicConnect – Smart India Hackathon Platform

A full-stack MERN application built for the **Smart India Hackathon (SIH)** to streamline civic issue reporting and community engagement. The platform enables citizens to report issues, track their status, and interact with local authorities through a secure and user-friendly interface.

🌐 **Live Demo:** https://sih-hackthon-frontend.onrender.com/

---

## 📖 Overview

CivicConnect is designed to bridge the gap between citizens and government authorities by providing a centralized platform for reporting and managing civic issues. Built with a modern tech stack, the application offers secure authentication, cloud-based image storage, and a responsive user experience.

---

## ✨ Features

- 🔐 Secure Authentication
  - Email & Password Login
  - Google OAuth Authentication
- 👤 User Profile Management
- 📝 Report Civic Issues
- 📸 Upload Images using Cloudinary
- 📍 Location-based Issue Reporting
- 📂 Category-wise Issue Management
- 📊 User Dashboard
- 🔎 Issue Tracking
- ⚡ RESTful API Integration
- 📱 Fully Responsive UI
- 🎨 Modern User Interface
- 🛡️ Protected Routes & JWT Authentication

---

# 🛠️ Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- Zod
- Lucide React

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Google OAuth
- Cloudinary
- Multer
- Express Validator
- CORS
- Dotenv

## Database

- MongoDB Atlas

## Cloud Storage

- Cloudinary

## Deployment

- Frontend → Render
- Backend → Render
- Database → MongoDB Atlas

---

# 📸 Screenshots

## 🏠 Home Page

![Home](./public/screenshots/home.png)

---

## 🔐 Login

![Login](./public/screenshots/login.png)

---

## 📊 Dashboard

![Dashboard](./public/screenshots/dashboard.png)

---

## 📝 Report Issue

![Report Issue](./public/screenshots/report-issue.png)

---

## 👤 User Profile

![Profile](./public/screenshots/profile.png)

---

# 📁 Project Structure

```text
client/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── App.tsx
│
└── package.json


server/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── types/
│   └── server.ts
│
└── package.json
```

---

# ⚙️ Getting Started

## Clone the repository

```bash
git clone https://github.com/your-username/civic-connect.git
```

```bash
cd civic-connect
```

---

## Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
npm install
```

---

## Environment Variables

### Backend (`.env`)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Run the Application

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

---

# 🚀 Deployment

### Frontend

Hosted on **Render**

🔗 https://sih-hackthon-frontend.onrender.com/

### Backend

Hosted on **Render**

### Database

MongoDB Atlas

### Image Storage

Cloudinary

---

# 🔒 Authentication

- Email & Password Authentication
- Google OAuth Login
- JWT Token Authentication
- Protected API Routes
- Secure Password Hashing

---

# 📦 API Features

- User Authentication
- Google Login
- Issue Management
- Image Upload
- User Profile
- Dashboard Data
- CRUD Operations
- Authentication Middleware

---

# 📱 Responsive Design

Optimized for:

- 💻 Desktop
- 💼 Laptop
- 📱 Mobile
- 📟 Tablet

---

# 🎯 Future Enhancements

- Push Notifications
- Real-time Issue Updates
- AI-powered Issue Classification
- Admin Dashboard
- Email Notifications
- Chat Support
- Progressive Web App (PWA)
- Dark Mode

---

# 👨‍💻 Author

**Shivam**

### GitHub

https://github.com/Shivam-031

### LinkedIn

https://www.linkedin.com/in/shivamnegi04

---

# ⭐ Show Your Support

If you like this project, please consider giving it a ⭐ on GitHub. It helps others discover the project and supports future development.