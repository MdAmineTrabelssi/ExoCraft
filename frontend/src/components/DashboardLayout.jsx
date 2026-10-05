import { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/exocraft-logo.png";

const menuItems = [
  { path: "/dashboard", page: "dashboard", icon: "▣", label: "Tableau de bord" },
  { path: "/archives", page: "archives", icon: "▧", label: "Archives" },
];

function DashboardLayout({ children, activePage }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButton.current?.focus();
  };

  const signOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navigation = (mobile = false) => (
    <>
      <p className="sidebar-title">MENU PRINCIPAL</p>
      <nav className="sidebar-menu" aria-label="Navigation principale">
        {menuItems.map(({ path, page, icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-item${isActive || activePage === page ? " active" : ""}`
            }
            onClick={mobile ? closeMenu : undefined}
          >
            <span className="sidebar-icon" aria-hidden="true">{icon}</span>
            <span className="sidebar-text">{label}</span>
          </NavLink>
        ))}
      </nav>
      <button type="button" className="sidebar-item sidebar-logout" onClick={signOut}>
        <span className="sidebar-icon" aria-hidden="true">↪</span>
        <span className="sidebar-text">Se déconnecter</span>
      </button>
    </>
  );

  return (
    <div
      className="dashboard-page"
      onKeyDown={(event) => {
        if (menuOpen && event.key === "Escape") closeMenu();
      }}
    >
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <aside className="sidebar" aria-label="Menu latéral">
        <Link to="/dashboard" className="sidebar-logo" aria-label="ExoCraft — Tableau de bord">
          <img src={logo} alt="ExoCraft" className="exocraft-logo" />
        </Link>
        <div className="sidebar-section">{navigation()}</div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-topbar-brand">
            <button
              ref={menuButton}
              type="button"
              className="dashboard-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
            </button>
            <Link to="/dashboard" className="dashboard-brand-link">ExoCraft</Link>
          </div>
          <div className="dashboard-user">
            <div className="dashboard-user-info">
              <span className="dashboard-user-label">ESPACE ENSEIGNANT</span>
              <span className="dashboard-user-email" title={user?.email}>
                {user?.email || "Utilisateur"}
              </span>
            </div>
            <Link to="/settings" className="dashboard-user-avatar" aria-label="Mon profil et mes paramètres">
              {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
            </Link>
          </div>
        </header>
        <div
          id="mobile-navigation"
          className="dashboard-mobile-menu"
          hidden={!menuOpen}
        >
          {navigation(true)}
        </div>
        <main id="main-content" className="dashboard-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
