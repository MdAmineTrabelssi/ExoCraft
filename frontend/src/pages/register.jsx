import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const userData = {
      name: name,
      email: email,
    };

    login(userData);

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <h1>Créer un compte</h1>

        <p className="auth-subtitle">
          Rejoignez ExoCraft et créez vos quiz
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="name">Nom</label>

            <input
              type="text"
              id="name"
              placeholder="Votre nom"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirmer le mot de passe
            </label>

            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              required
            />
          </div>

          <button type="submit" className="auth-button">
            S'inscrire
          </button>

        </form>

        <p className="auth-link">
          Vous avez déjà un compte ?{" "}
          <Link to="/login">
            Se connecter
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;