import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-container">

        <div className="dashboard-header">
          <h1>Bienvenue sur ExoCraft</h1>

          {user && (
            <p>
              Bonjour {user.name || user.email} 👋
            </p>
          )}

          <p>
            Créez, gérez et réalisez vos quiz facilement.
          </p>

          <button onClick={handleLogout} className="dashboard-button">
            Déconnexion
          </button>
        </div>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h2>Créer un quiz</h2>

            <p>
              Générez un nouveau quiz à partir de votre cours.
            </p>

            <Link
              to="/create-quiz"
              className="dashboard-button"
            >
              Créer un quiz
            </Link>
          </div>

          <div className="dashboard-card">
            <h2>Mes quiz</h2>

            <p>
              Consultez et gérez vos quiz existants.
            </p>

            <Link
              to="/my-quizzes"
              className="dashboard-button"
            >
              Voir mes quiz
            </Link>
          </div>

          <div className="dashboard-card">
            <h2>Historique</h2>

            <p>
              Consultez vos résultats et vos anciennes tentatives.
            </p>

            <Link
              to="/history"
              className="dashboard-button"
            >
              Voir l'historique
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;