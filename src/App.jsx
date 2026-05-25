import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import { useAuth } from "./context/AuthContext";
import "./App.css";

function App() {

  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/products"
          element={
            isAuthenticated
              ? <ProductsPage />
              : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<Navigate to="/products" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;