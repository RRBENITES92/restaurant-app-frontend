import { useState } from "react";
import { LogIn, Eye, EyeOff } from "lucide-react";

function LoginForm({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  error,
  loadingLogin
}) {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleLogin} className="login-form">
      <div className="form-group">
        <label>Usuario</label>
        <input
          className="input form-input"
          type="text"
          placeholder="Ingresa tu usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <div className="password-wrapper">
          <input
            className="input form-input"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {error && (
        <div className="login-error">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="button button-primary button-icon login-button"
        disabled={loadingLogin}
      >
        <LogIn size={16} />
        {loadingLogin ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}

export default LoginForm;