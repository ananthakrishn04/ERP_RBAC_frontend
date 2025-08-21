import { Routes, Route } from "react-router-dom"
import "./styles/styles.css"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"
import Layout from "./pages/Layout"

function App() {

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
                <Dashboard/>
            }
          />
          <Route
            path="/profile"
            element={
              <Profile/>
            }
          />
        </Route>
    </Routes>
  )
}

export default App
