import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/exocraft-logo.png";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError(
        "Veuillez renseigner tous les champs."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Les mots de passe ne correspondent pas."
      );
      return;
    }

    /*
      TEMPORAIRE POUR LE FRONTEND

      Le backend prendra ensuite en charge :
      - la création réelle du compte
      - le hash du mot de passe avec bcrypt
      - le rôle de l'utilisateur
      - le JWT
    */

    const userData = {
      email: email.trim(),
    };

    login(userData);

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="auth-header">

        <Link to="/" className="auth-logo-link">
          <img
            src={logo}
            alt="ExoCraft"
            className="auth-logo"
          />
        </Link>

        <div className="auth-header-text">

          <span>
            Vous avez déjà un compte ?
          </span>

          <Link to="/login">
            Se connecter
          </Link>

        </div>

      </header>

      {/* =====================================================
          REGISTER
      ===================================================== */}

      <main className="auth-main">

        <div className="auth-container">

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="auth-heading">

            <span className="auth-eyebrow">
              CRÉER VOTRE COMPTE
            </span>

            <h1>
              Rejoignez ExoCraft
            </h1>

            <p>
              Créez votre compte pour commencer à créer
              et gérer vos contenus pédagogiques.
            </p>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Adresse email
              </label>

              <input
                type="email"
                id="email"
                value={email}
                placeholder="exemple@email.com"
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <label htmlFor="password">
                Mot de passe
              </label>

              <input
                type="password"
                id="password"
                value={password}
                placeholder="Votre mot de passe"
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="new-password"
                required
              />

              <span className="auth-input-hint">
                Minimum 6 caractères
              </span>

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirmer le mot de passe
              </label>

              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirmez votre mot de passe"
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
                required
              />

            </div>

            {/* ERROR */}

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-button"
            >
              <span>
                Créer mon compte
              </span>

              <span>
                →
              </span>
            </button>

          </form>

          {/* =================================================
              LOGIN
          ================================================= */}

          <div className="auth-bottom">

            <span>
              Vous avez déjà un compte ?
            </span>

            <Link to="/login">
              Se connecter
            </Link>

          </div>

          {/* =================================================
              SECURITY
          ================================================= */}

          <div className="auth-security">

            <span>
              🔒
            </span>

            <p>
              Vos informations de compte sont protégées.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Register;