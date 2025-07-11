✅ Updated README.md for DevPort

# 🚀 DevPort – Developer Portfolio & Networking Platform

DevPort is a full-stack MERN application where developers can create personal portfolios, showcase projects, endorse each other’s skills, and build meaningful tech connections. Think of it as GitHub meets LinkedIn, focused entirely on portfolios and networking in the developer community.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS (or Bootstrap)
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password security
- Multer / Cloudinary for file uploads

---

## ✨ Key Features

- 🔐 User Authentication (JWT)
- 👤 Developer Profile with Bio, Skills, Socials
- 📁 Upload & Showcase Projects (with GitHub links)
- 🌍 Discover & Follow Other Developers
- ⭐ Endorse Skills
- 💬 Activity Feed (optional, for v2)
- 🖥️ Fully Responsive Design

---

## 🧱 Folder Structure Overview

devport/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── routes/
│ │ └── App.jsx
│ └── public/


---

## 🚀 Getting Started (Local)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/devport.git
cd devport
2. Backend Setup

cd backend
npm install
Create .env in backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
Start the server:

npm run dev
3. Frontend Setup

cd frontend
npm install
Create .env in frontend/:

VITE_API_BASE_URL=http://localhost:5000/api
Start the frontend:

npm run dev
📡 Key API Endpoints
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login user
GET	/users/:id	Get user profile
PUT	/users/follow/:id	Follow user
POST	/users/endorse/:id	Endorse skill
POST	/projects/add	Add a project
GET	/projects/user/:id	Get user’s projects

🌍 Deployment
Backend: Render, Railway, or VPS

Frontend: Vercel or Netlify

Database: MongoDB Atlas

Media Hosting: Cloudinary

🤝 Contributing
Pull requests are welcome! If you'd like to contribute, fork the repo and make your changes on a new branch.

📄 License
This project is licensed under the MIT License.

👨‍💻 Creator
Built with 💻 by Denis Kipkurui
Connect on GitHub: https://github.com/Denis-alt254

---

Would you like:
- This README with **badges** (build, license, live)?
- A **GitHub repository setup guide**?
- Or a **contribution guide** for others?

Let me know what else you need for **DevPort**!