import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<LoginPage setToken={setToken} setRole={setRole} />}
        />

        <Route
          path="/products"
          element={
            token
              ? <ProductsPage token={token} role={role} handleLogout={handleLogout} />
              : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<Navigate to="/products" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;