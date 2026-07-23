# 💰 FinanceFlow

FinanceFlow is an AI-powered personal finance management platform that helps users track expenses, manage budgets, analyze spending, generate reports, and receive AI-powered financial insights.

## 🚀 Features

- 🔐 Secure JWT Authentication
- 👤 User Profile Management
- 💳 Expense Tracking (CRUD)
- 📂 Category-wise Expense Management
- 🎯 Monthly Budget Planning
- 📈 Analytics Dashboard
- 📊 Financial Reports
- 🤖 AI Financial Assistant (Google Gemini)
- 🎤 Voice Expense Entry
- 🔔 Notifications
- 🔍 Global Search
- 📄 PDF & CSV Report Export
- 📱 Fully Responsive Design

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Nodemailer

### AI
- Google Gemini API (@google/genai)

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 📂 Project Structure

```
FinanceFlow
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── services
│   ├── utils
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key

FRONTEND_URL=http://localhost:5173
```

## ⚙️ Frontend Environment Variables

Create a `.env` file inside the **frontend** folder.

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```

## 🖥 Local Installation

Clone the repository

```bash
git clone https://github.com/yourusername/FinanceFlow.git
```

Install backend dependencies

```bash
cd backend
npm install
```

Install frontend dependencies

```bash
cd ../frontend
npm install
```

Start backend

```bash
npm run dev
```

Start frontend

```bash
npm run dev
```

---

## 🌐 Deployment

### Frontend (Vercel)

Set

```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```

Deploy the **frontend** folder.

---

### Backend (Render)

Configure these Environment Variables:

- PORT
- MONGODB_URI
- JWT_SECRET
- GEMINI_API_KEY
- FRONTEND_URL

Deploy the **backend** folder.

---

## 📸 Screenshots

Add screenshots inside the `screenshots/` folder.

- Landing Page
- Login
- Dashboard
- Expenses
- Budgets
- Analytics
- Reports
- AI Assistant

---

## 🔮 Future Enhancements

- Investment Tracking
- Recurring Expenses
- Savings Goals
- Bill Reminders
- Mobile App
- Multi-Currency Support

---

## 👨‍💻 Developer

**Chaganti Naga Veera Satya Teja**

- Full Stack Developer
- React.js • Node.js • MongoDB • Express.js
- AI & Finance Application Developer

---

⭐ If you like this project, consider giving it a star!