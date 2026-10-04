import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function History() {
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState("all");

  // Récupérer les contenus réellement générés
  const [history] = useState(() => {
    const savedContents = localStorage.getItem(
      "exocraft_contents"
    );

    if (!savedContents) {
      return [];
    }

    try {
      const contents = JSON.parse(savedContents);

      // Ajouter la date d'affichage puis trier
      // du plus récent au plus ancien
      return contents
        .map((content) => ({
          ...content,
          date:
            content.createdAt ||
            new Date().toLocaleDateString("fr-FR"),
        }))
        .sort((a, b) => {
          return (
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
          );
        });
    } catch (error) {
      console.error(
        "Erreur lors de la lecture de l'historique :",
        error
      );

      return [];
    }
  });

  const contentTypes = {
    course: {
      label: "Cours",
      icon: "📘",
    },

    summary: {
      label: "Résumé",
      icon: "📄",
    },

    exercises: {
      label: "Série d'exercices",
      icon: "✎",
    },

    quiz: {
      label: "Quiz",
      icon: "☑",
    },

    exam: {
      label: "Examen",
      icon: "📋",
    },
  };

  const filteredHistory = history.filter((item) => {
    return (
      filterType === "all" ||
      item.type === filterType
    );
  });

  const handleView = (item) => {
    sessionStorage.setItem(
      "exocraft_selected_content",
      JSON.stringify(item)
    );

    if (item.type === "quiz") {
      navigate("/generated-quiz");
      return;
    }

    if (item.type === "exam") {
      navigate("/generated-exam");
      return;
    }

    if (
      item.type === "course" ||
      item.type === "summary"
    ) {
      navigate("/generated-course");
      return;
    }

    if (item.type === "exercises") {
      navigate("/generated-exercises");
      return;
    }
  };

  const getStatusLabel = (status) => {
    if (status === "valid") {
      return "Validé";
    }

    return "Brouillon";
  };

  return (
    <DashboardLayout activePage="history">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="history-header">

        <div>

          <span className="dashboard-eyebrow">
            HISTORIQUE
          </span>

          <h1>
            Historique des générations
          </h1>

          <p>
            Retrouvez les contenus générés récemment
            sur ExoCraft.
          </p>

        </div>

        <button
          type="button"
          className="history-create-button"
          onClick={() => navigate("/generator")}
        >
          <span>✦</span>
          Nouvelle génération
        </button>

      </section>


      {/* =====================================================
          FILTRE
      ===================================================== */}

      <section className="history-filters">

        <div className="history-filter-group">

          <label htmlFor="history-type">
            Type de contenu
          </label>

          <select
            id="history-type"
            value={filterType}
            onChange={(event) =>
              setFilterType(event.target.value)
            }
          >

            <option value="all">
              Tous les types
            </option>

            <option value="course">
              Cours
            </option>

            <option value="summary">
              Résumés
            </option>

            <option value="exercises">
              Séries d'exercices
            </option>

            <option value="quiz">
              Quiz
            </option>

            <option value="exam">
              Examens
            </option>

          </select>

        </div>

      </section>


      {/* =====================================================
          LISTE
      ===================================================== */}

      <section className="history-list-section">

        <div className="history-list-header">

          <div>

            <span className="history-list-label">
              GÉNÉRATIONS
            </span>

            <h2>
              {filteredHistory.length} génération
              {filteredHistory.length !== 1
                ? "s"
                : ""}
            </h2>

          </div>

        </div>


        {filteredHistory.length === 0 ? (

          <div className="history-empty">

            <div className="history-empty-icon">
              ◷
            </div>

            <h3>
              Aucun historique
            </h3>

            <p>
              Aucune génération ne correspond au
              filtre sélectionné.
            </p>

          </div>

        ) : (

          <div className="history-grid">

            {filteredHistory.map((item) => {

              const type =
                contentTypes[item.type] || {
                  label: "Contenu",
                  icon: "📄",
                };

              return (

                <article
                  className="history-card"
                  key={item.id}
                >

                  <div className="history-card-top">

                    <div className="history-type">

                      <div className="history-type-icon">
                        {type.icon}
                      </div>

                      <span>
                        {type.label}
                      </span>

                    </div>

                    <span
                      className={
                        item.status === "valid"
                          ? "history-status valid"
                          : "history-status draft"
                      }
                    >
                      {getStatusLabel(
                        item.status
                      )}
                    </span>

                  </div>


                  <h3>
                    {item.title}
                  </h3>


                  <p className="history-subject">
                    {item.subject}
                  </p>


                  <div className="history-details">

                    <div>

                      <span>
                        Promotion
                      </span>

                      <strong>
                        {item.promotion || "—"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Date
                      </span>

                      <strong>
                        {item.date}
                      </strong>

                    </div>

                  </div>


                  <div className="history-card-footer">

                    <button
                      type="button"
                      className="history-view-button"
                      onClick={() =>
                        handleView(item)
                      }
                    >
                      Consulter
                    </button>

                  </div>

                </article>

              );
            })}

          </div>

        )}

      </section>

    </DashboardLayout>
  );
}

export default History;