import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/exocraft-logo.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError(
        "Veuillez renseigner votre adresse email et votre mot de passe."
      );
      return;
    }

    /*
      TEMPORAIRE POUR LE FRONTEND

      Le backend prendra ensuite en charge :
      - la vérification du mot de passe
      - bcrypt
      - JWT
      - le rôle de l'utilisateur
    */

    let savedProfile = null;
    try {
      const profile = JSON.parse(localStorage.getItem("exocraft_profile") || "null");
      if (profile?.email?.toLowerCase() === email.trim().toLowerCase()) savedProfile = profile;
    } catch {
      savedProfile = null;
    }
    const userData = savedProfile || { email: email.trim() };

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
          <span>Pas encore de compte ?</span>

          <Link to="/register">
            Créer un compte
          </Link>
        </div>

      </header>

      {/* =====================================================
          LOGIN
      ===================================================== */}

      <main className="auth-main">

        <div className="auth-container">

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="auth-heading">

            <span className="auth-eyebrow">
              ESPACE ENSEIGNANT
            </span>

            <h1>
              Bon retour sur ExoCraft
            </h1>

            <p>
              Connectez-vous pour accéder à vos contenus
              pédagogiques et continuer votre travail.
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
                autoComplete="current-password"
                required
              />

              {/* MOT DE PASSE OUBLIE */}

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  alert(
                    "La récupération du mot de passe sera disponible avec le backend."
                  )
                }
              >
                Mot de passe oublié ?
              </button>

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
              <span>Se connecter</span>
              <span>→</span>
            </button>

          </form>

          {/* =================================================
              REGISTER
          ================================================= */}

          <div className="auth-bottom">

            <span>
              Vous n'avez pas encore de compte ?
            </span>

            <Link to="/register">
              Créer un compte
            </Link>

          </div>

          {/* =================================================
              SECURITY
          ================================================= */}

          <div className="auth-security">

            <span>🔒</span>

            <p>
              Vos informations de connexion sont protégées.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Login;
