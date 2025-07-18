# Minimal Full Stack Todo App

This is a **Minimal Full Stack Todo Application** built using:

* **Frontend**: Next.js 15 (React 19, Redux Toolkit, Tailwind CSS)
* **Backend**: Node.js, Express, MongoDB
* **Authentication**: JWT-based login/signup with protected routes
* **Features**: CRUD Todo, Auth, Status Filtering

---

## 🔗 GitHub Repositories

* **Main Repo (Monorepo)**: [https://github.com/MHDRabeeh/Minimal-full-stack-todo](https://github.com/MHDRabeeh/Minimal-full-stack-todo)
* **Frontend Only**: [https://github.com/MHDRabeeh/Minimal-full-stack-todo/tree/main/frontend](https://github.com/MHDRabeeh/Minimal-full-stack-todo/tree/main/frontend)
* **Backend Only**: [https://github.com/MHDRabeeh/Minimal-full-stack-todo/tree/main/backend](https://github.com/MHDRabeeh/Minimal-full-stack-todo/tree/main/backend)

---


---

## 🧪 Backend Setup Instructions

### Prerequisites:

* Node.js (v18 or above recommended)
* MongoDB Atlas URI
* pnpm (`npm install -g pnpm`)

### 1. Install dependencies:

```bash
cd backend
pnpm install
```

### 2. Create `.env` file:

```
PORT=5000
MONGO_URI=mongodb+srv://<your_mongo_uri>
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 3. Run backend server:

```bash
pnpm dev
```

Server will run at `http://localhost:5000`

---

## 🧑‍💻 Frontend Setup Instructions

### 1. Install dependencies:

```bash
cd frontend
pnpm install
```

### 2. Run development server:

```bash
pnpm dev
```

App will run at `http://localhost:3000`

---

## 🚀 Features

* 🔐 User registration and login (JWT based)
* ✏️ Create, edit, and delete todos
* 📋 Mark todos as complete/pending
* 🔒 Protected routes with JWT and cookies
* 📱 Responsive design using Tailwind CSS
* ✅ Redux Toolkit for global state management
* ☁️ Axios for API communication
* 📌 Filter todos by status (`pending`, `completed`)

---



## 📧 Contact

**Developer:** Mohammed Rabeeh


---

> Thank you for reviewing my project! Feel free to give feedback or suggestions.
