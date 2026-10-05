import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";


function Dashboard() {
  const navigate = useNavigate();


  /*
    DONNÉES TEMPORAIRES FRONTEND

    Elles seront remplacées par les données du backend :
    - matières associées à l'enseignant
    - promotions associées à l'enseignant
    - contenus de l'enseignant
    - archives accessibles
  */

  const subjects = [
    "Cloud Computing",
    "Réseaux informatiques",
  ];

  const promotions = [
    "Cycle ingénieur",
  ];

  const contentTypes = [
    {
      icon: "📘",
      title: "Cours",
      type: "course",
      description:
        "Créer un cours ou un résumé à partir d'un thème ou d'un plan.",
      path: "/generator",
    },
    {
      icon: "✎",
      title: "Série d'exercices",
      type: "exercises",
      description:
        "Générer une série d'exercices à partir d'un thème.",
      path: "/generator",
    },
    {
      icon: "☑",
      title: "Quiz",
      type: "quiz",
      description:
        "Créer un quiz à choix multiples avec difficulté et nombre de questions configurables.",
      path: "/generator",
    },
    {
      icon: "📋",
      title: "Examen",
      type: "exam",
      description:
        "Préparer un examen avec durée, barème et consignes.",
      path: "/generator",
    },
  ];

  const handleCreateContent = (path, contentType) => {
    navigate(path, { state: { contentType } });
  };

  return (
    <DashboardLayout activePage="dashboard">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="dashboard-welcome">

        <div>

          <span className="dashboard-eyebrow">
            ESPACE ENSEIGNANT
          </span>

          <h1>
            Bienvenue sur ExoCraft
          </h1>

          <p>
            Créez, générez et gérez vos contenus pédagogiques
            depuis votre espace.
          </p>

        </div>

        <button
          type="button"
          className="dashboard-primary-button"
          onClick={() => navigate("/generator")}
        >
          <span>✦</span>
          Générer un contenu
        </button>

      </section>

      {/* =====================================================
          PROFIL PÉDAGOGIQUE
      ===================================================== */}

      <section className="dashboard-associations">

        <div className="dashboard-section-header">

          <div>
            <span className="dashboard-section-eyebrow">
              VOTRE ESPACE
            </span>

            <h2>
              Vos associations pédagogiques
            </h2>
          </div>

          <button
            type="button"
            className="dashboard-link-button"
            onClick={() => navigate("/settings")}
          >
            Gérer mes associations →
          </button>

        </div>

        <div className="dashboard-association-grid">

          {/* MATIÈRES */}

          <div className="dashboard-association-card">

            <div className="dashboard-association-icon">
              📚
            </div>

            <div className="dashboard-association-content">

              <span className="dashboard-card-label">
                MATIÈRES
              </span>

              <h3>
                Vos matières
              </h3>

              <div className="dashboard-tags">

                {subjects.map((subject) => (
                  <span
                    className="dashboard-tag"
                    key={subject}
                  >
                    {subject}
                  </span>
                ))}

              </div>

            </div>

          </div>

          {/* PROMOTIONS */}

          <div className="dashboard-association-card">

            <div className="dashboard-association-icon">
              🎓
            </div>

            <div className="dashboard-association-content">

              <span className="dashboard-card-label">
                PROMOTIONS
              </span>

              <h3>
                Vos promotions
              </h3>

              <div className="dashboard-tags">

                {promotions.map((promotion) => (
                  <span
                    className="dashboard-tag"
                    key={promotion}
                  >
                    {promotion}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CRÉATION DE CONTENU
      ===================================================== */}

      <section className="dashboard-create-section">

        <div className="dashboard-section-header">

          <div>

            <span className="dashboard-section-eyebrow">
              CRÉATION
            </span>

            <h2>
              Que souhaitez-vous créer ?
            </h2>

            <p>
              Choisissez le type de contenu pédagogique
              que vous souhaitez préparer.
            </p>

          </div>

        </div>

        <div className="dashboard-content-grid">

          {contentTypes.map((content) => (
            <button
              type="button"
              className="dashboard-content-card"
              key={content.title}
              onClick={() =>
                handleCreateContent(content.path, content.type)
              }
            >

              <div className="dashboard-content-card-top">

                <div className="dashboard-content-icon">
                  {content.icon}
                </div>

                <span className="dashboard-content-arrow">
                  →
                </span>

              </div>

              <h3>
                {content.title}
              </h3>

              <p>
                {content.description}
              </p>

            </button>
          ))}

        </div>

      </section>

      {/* =====================================================
          ARCHIVES
      ===================================================== */}

      <section className="dashboard-archives-card">

        <div className="dashboard-archives-icon">
          ▤
        </div>

        <div className="dashboard-archives-content">

          <span className="dashboard-section-eyebrow">
            ARCHIVES PÉDAGOGIQUES
          </span>

          <h2>
            Réutilisez vos archives
          </h2>

          <p>
            Consultez les archives correspondant à vos
            matières et promotions et utilisez-les comme
            base pour générer de nouveaux contenus.
          </p>

        </div>

        <button
          type="button"
          className="dashboard-outline-button"
          onClick={() => navigate("/archives")}
        >
          Consulter les archives
          <span>→</span>
        </button>

      </section>

    </DashboardLayout>
  );
}

export default Dashboard;