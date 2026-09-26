import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: email,
    };

    login(userData);

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <h1>Connexion</h1>

        <p className="auth-subtitle">
          Connectez-vous à votre compte ExoCraft
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              placeholder="Votre email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>

            <input
              type="password"
              id="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Se connecter
          </button>

        </form>

        <p className="auth-link">
          Pas encore de compte ?{" "}
          <Link to="/register">
            Créer un compte
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;