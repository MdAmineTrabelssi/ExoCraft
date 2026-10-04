import { useNavigate } from "react-router-dom";
import logo from "../assets/exocraft-logo.png";

function Home() {
  const navigate = useNavigate();

  const contentTypes = [
    {
      icon: "📘",
      title: "Cours",
      description:
        "Créez des contenus pédagogiques structurés à partir d’un thème ou d’un plan.",
    },
    {
      icon: "📝",
      title: "Résumés",
      description:
        "Générez des résumés pédagogiques clairs et adaptés à vos besoins.",
    },
    {
      icon: "✎",
      title: "Séries d’exercices",
      description:
        "Générez des séries d’exercices à partir d’un thème.",
    },
    {
      icon: "☑",
      title: "Quiz",
      description:
        "Créez des quiz à choix multiples avec niveau et nombre de questions configurables.",
    },
    {
      icon: "📋",
      title: "Examens",
      description:
        "Préparez des examens structurés avec durée, barème et consignes.",
    },
  ];

  return (
    <div className="home-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="home-navbar">
        <div className="home-brand">
          <img
            src={logo}
            alt="ExoCraft"
            className="home-logo"
          />
        </div>

        <nav className="home-nav">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="home-login-button"
          >
            Connexion
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="home-register-button"
          >
            Créer un compte
          </button>
        </nav>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <main>

        <section className="home-hero">

          <div className="home-hero-content">

            <span className="home-eyebrow">
              PLATEFORME PÉDAGOGIQUE PAR IA
            </span>

            <h1>
              Créez vos contenus
              <br />
              pédagogiques avec{" "}
              <span>ExoCraft</span>
            </h1>

            <p>
              Une plateforme pour créer, générer, modifier,
              valider, exporter et publier vos contenus
              pédagogiques à partir d’un simple thème.
            </p>

            <div className="home-hero-actions">

              <button
                type="button"
                className="home-primary-button"
                onClick={() => navigate("/register")}
              >
                Commencer gratuitement
                <span>→</span>
              </button>

              <button
                type="button"
                className="home-secondary-button"
                onClick={() => navigate("/login")}
              >
                Se connecter
              </button>

            </div>

          </div>

          {/* =================================================
              HERO VISUAL
          ================================================= */}

          <div className="home-hero-visual">

            <div className="home-ai-card">

              <div className="home-ai-header">
                <div className="home-ai-icon">
                  ✦
                </div>

                <div>
                  <strong>ExoCraft IA</strong>
                  <span>Assistant pédagogique</span>
                </div>
              </div>

              <div className="home-ai-line">
                <span>Thème</span>
                <strong>Cloud Computing</strong>
              </div>

              <div className="home-ai-line">
                <span>Contenu</span>
                <strong>Quiz</strong>
              </div>

              <div className="home-ai-line">
                <span>Statut</span>
                <strong className="home-ai-status">
                  Génération...
                </strong>
              </div>

              <div className="home-ai-progress">
                <div className="home-ai-progress-bar"></div>
              </div>

            </div>

            <div className="home-floating-card home-floating-card-top">
              <span>✓</span>
              <div>
                <strong>Contenu structuré</strong>
                <small>Généré par IA</small>
              </div>
            </div>

            <div className="home-floating-card home-floating-card-bottom">
              <span>✎</span>
              <div>
                <strong>Modification manuelle</strong>
                <small>Avant validation</small>
              </div>
            </div>

          </div>

        </section>

        {/* =====================================================
            TYPES DE CONTENU
        ===================================================== */}

        <section className="home-content-section">

          <div className="home-section-header">

            <span className="home-eyebrow">
              VOS CONTENUS
            </span>

            <h2>
              Un seul espace pour tous
              <br />
              vos contenus pédagogiques
            </h2>

            <p>
              ExoCraft vous accompagne dans la création et
              la gestion de vos différents supports pédagogiques.
            </p>

          </div>

          <div className="home-content-grid">

            {contentTypes.map((content) => (
              <div
                className="home-content-card"
                key={content.title}
              >
                <div className="home-content-icon">
                  {content.icon}
                </div>

                <h3>{content.title}</h3>

                <p>{content.description}</p>
              </div>
            ))}

          </div>

        </section>

        {/* =====================================================
            WORKFLOW
        ===================================================== */}

        <section className="home-workflow-section">

          <div className="home-section-header">

            <span className="home-eyebrow">
              COMMENT ÇA MARCHE
            </span>

            <h2>
              De votre thème à votre
              <br />
              contenu pédagogique
            </h2>

          </div>

          <div className="home-workflow">

            <div className="home-workflow-step">
              <div className="home-workflow-number">
                01
              </div>

              <h3>Définissez votre contenu</h3>

              <p>
                Choisissez le type de contenu et saisissez
                votre thème ou votre plan.
              </p>
            </div>

            <div className="home-workflow-line"></div>

            <div className="home-workflow-step">
              <div className="home-workflow-number">
                02
              </div>

              <h3>Générez avec l’IA</h3>

              <p>
                ExoCraft génère automatiquement un contenu
                pédagogique structuré.
              </p>
            </div>

            <div className="home-workflow-line"></div>

            <div className="home-workflow-step">
              <div className="home-workflow-number">
                03
              </div>

              <h3>Modifiez et validez</h3>

              <p>
                Relisez et modifiez le contenu avant de
                le valider.
              </p>
            </div>

            <div className="home-workflow-line"></div>

            <div className="home-workflow-step">
              <div className="home-workflow-number">
                04
              </div>

              <h3>Exportez ou publiez</h3>

              <p>
                Exportez votre contenu ou rendez-le
                disponible aux autres enseignants.
              </p>
            </div>

          </div>

        </section>

        {/* =====================================================
            ARCHIVES
        ===================================================== */}

        <section className="home-archive-section">

          <div className="home-archive-card">

            <div className="home-archive-icon">
              ▤
            </div>

            <div className="home-archive-content">

              <span className="home-eyebrow">
                ARCHIVES PÉDAGOGIQUES
              </span>

              <h2>
                Réutilisez vos contenus
                existants
              </h2>

              <p>
                Les archives pédagogiques peuvent être
                utilisées comme base pour générer de
                nouveaux contenus, selon les matières
                et promotions auxquelles vous êtes associé.
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="home-cta-section">

          <div className="home-cta">

            <span className="home-cta-icon">
              ✦
            </span>

            <h2>
              Prêt à créer vos contenus
              pédagogiques ?
            </h2>

            <p>
              Commencez à utiliser ExoCraft pour simplifier
              la préparation de vos supports pédagogiques.
            </p>

            <button
              type="button"
              className="home-primary-button"
              onClick={() => navigate("/register")}
            >
              Créer un compte
              <span>→</span>
            </button>

          </div>

        </section>

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="home-footer">

        <div className="home-footer-brand">
          <img
            src={logo}
            alt="ExoCraft"
            className="home-footer-logo"
          />

          <span>
            Plateforme de génération et de gestion
            de contenus pédagogiques par IA.
          </span>
        </div>

        <div className="home-footer-copy">
          © 2026 ExoCraft
        </div>

      </footer>

    </div>
  );
}

export default Home;