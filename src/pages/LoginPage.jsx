import { useState } from "react";
import { login } from "../api/authApi";
import LoginForm from "../components/LoginForm";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginPage({ setToken, setRole }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoadingLogin(true);

        try {
            const receivedToken = await login(username, password);

            localStorage.setItem("token", receivedToken);
            setToken(receivedToken);

            const decoded = jwtDecode(receivedToken);
            setRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

            navigate("/products");
        } catch (error) {
            setError("Usuario o contraseña incorrectos");
        } finally {
            setLoadingLogin(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1>Restaurant Admin</h1>
                    <p>Inicia sesión para gestionar los productos del restaurante</p>
                </div>

                <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    error={error}
                    loadingLogin={loadingLogin}
                />
            </div>
        </div>
    );
}

export default LoginPage;