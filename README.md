# React Admin Dashboard

A role-based dashboard built with **React + Vite** and **Redux Toolkit**, featuring authentication, protected routes, and an admin panel to manage users (CRUD operations).

---

## 🚀 Features
- JWT authentication with protected routes
- Role-based access control (Admin, Manager, Employee)
- Admin Dashboard with:
  - View all users
  - Create new users
  - Update user details inline in the table
  - Delete users
- Error handling with field-level validation messages
- Environment-based API URL
- Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack
- **Frontend**: React, Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Deployment**: Render

---

## 📂 Project Structure
```

src/
├── api/
│   └── axiosInstance.js
├── components/
│   ├── ProtectedRoute.jsx
│   └── Navbar.jsx
|   └── ErrorMessage.jsx
├── features/
│   └── authSlice.js
├── pages/
│   ├── Login.jsx
|   ├── Layout.jsx
│   ├── Dashboard.jsx
│   ├── AdminDashboard.jsx
|   ├── ManagerDashboard.jsx
│   └── Profile.jsx
├── styles/
│   └── styles.css
└── App.jsx

````

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
    ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```bash
   VITE_API_URL=http://localhost:8000/api
   ```

   Access this in code via:

   ```js
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

4. **Run locally**

   ```bash
   npm run dev
   ```

   App will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🔒 Authentication & Protected Routes

* Users must be logged in to access `/dashboard` and `/profile`.
* Unauthorized users are redirected to `/login`.
* Admin-only pages (like `AdminDashboard`) are restricted based on `role`.

---

## 🐞 Error Handling

* Backend errors are returned in object format:

  ```json
  { 
    "username": "Username already exists", 
    "password": "Password too common" 
  }
  ```
* These are displayed near the respective form fields using the `ErrorMessage` component.

---

## 📌 Future Improvements

* Add pagination for user management
* Add password reset flow
* Improve UI/UX with modals for user creation
