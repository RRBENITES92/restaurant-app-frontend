function LoginForm({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin
}) {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="form">
        <input
          className="input"
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="button button-primary">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default LoginForm;