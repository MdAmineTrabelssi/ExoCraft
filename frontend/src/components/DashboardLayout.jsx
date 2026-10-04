import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/exocraft-logo.png";

function DashboardLayout({ children, activePage }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-page">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="sidebar">

        {/* LOGO */}

        <div className="sidebar-logo">

          <img
            src={logo}
            alt="ExoCraft"
            className="exocraft-logo"
          />

        </div>

        {/* MENU */}

        <div className="sidebar-section">

          <p className="sidebar-title">
            MENU PRINCIPAL
          </p>

          <div className="sidebar-menu">

            {/* TABLEAU DE BORD */}

            <button
              type="button"
              className={
                activePage === "dashboard"
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
              onClick={() => goTo("/dashboard")}
            >
              <span className="sidebar-icon">
                ▣
              </span>

              <span className="sidebar-text">
                Tableau de bord
              </span>
            </button>

            {/* GÉNÉRATEUR */}

            <button
              type="button"
              className={
                activePage === "generator"
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
              onClick={() => goTo("/generator")}
            >
              <span className="sidebar-icon">
                ✦
              </span>

              <span className="sidebar-text">
                Générateur IA
              </span>
            </button>

            {/* MES CONTENUS */}

            <button
              type="button"
              className={
                activePage === "contents"
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
              onClick={() => goTo("/my-content")}
            >
              <span className="sidebar-icon">
                ▤
              </span>

              <span className="sidebar-text">
                Mes contenus
              </span>
            </button>

            {/* ARCHIVES */}

            <button
              type="button"
              className={
                activePage === "archives"
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
              onClick={() => goTo("/archives")}
            >
              <span className="sidebar-icon">
                ▧
              </span>

              <span className="sidebar-text">
                Archives
              </span>
            </button>

            {/* HISTORIQUE */}

            <button
              type="button"
              className={
                activePage === "history"
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
              onClick={() => goTo("/history")}
            >
              <span className="sidebar-icon">
                ◷
              </span>

              <span className="sidebar-text">
                Historique
              </span>
            </button>

            {/* PARAMÈTRES */}

            <button
              type="button"
              className={
                activePage === "settings"
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
              onClick={() => goTo("/settings")}
            >
              <span className="sidebar-icon">
                ⚙
              </span>

              <span className="sidebar-text">
                Paramètres
              </span>
            </button>

          </div>

        </div>

      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="dashboard-main">

        {/* ===================================================
            TOPBAR
        =================================================== */}

        <header className="dashboard-topbar">

          <div className="dashboard-topbar-brand">

            <button
              type="button"
              className="dashboard-back-button"
              onClick={() => goTo("/dashboard")}
              title="Retour au tableau de bord"
            >
              ←
            </button>

            <span>
              ExoCraft
            </span>

          </div>

          <div className="dashboard-user">

            <div className="dashboard-user-info">

              <span className="dashboard-user-label">
                ESPACE ENSEIGNANT
              </span>

              <span className="dashboard-user-email">
                {user?.email || "Utilisateur"}
              </span>

            </div>

            <div className="dashboard-user-avatar">
              {user?.email
                ? user.email.charAt(0).toUpperCase()
                : "U"}
            </div>

          </div>

        </header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <main className="dashboard-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;