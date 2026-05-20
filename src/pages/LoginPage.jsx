import { useState } from "react";
import { login } from "../api/authApi";
import LoginForm from "../components/LoginForm";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginPage({ setToken, setRole }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const receivedToken = await login(username, password);

            localStorage.setItem("token", receivedToken);
            setToken(receivedToken);

            const decoded = jwtDecode(receivedToken);
            setRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

            navigate("/products");

        } catch (error) {
            alert("Error en login");
        }
    };

    return (
        <div className="container">
            <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
            />
        </div>
    );
}

export default LoginPage;