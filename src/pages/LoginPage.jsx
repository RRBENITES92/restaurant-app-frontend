import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { login as loginApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoadingLogin(true);

        try {
            const receivedToken = await loginApi(username, password);

            login(receivedToken);

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