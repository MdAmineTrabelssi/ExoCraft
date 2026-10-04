import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function MyQuizzes() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Cloud Computing",
      description:
        "Évaluation sur les concepts fondamentaux du Cloud Computing.",
      type: "QCM",
      questions: 10,
      difficulty: "Moyenne",
      date: "30 septembre 2026",
      icon: "☁",
      generatedByAI: true,
    },
    {
      id: 2,
      title: "Réseaux informatiques",
      description:
        "Quiz sur les réseaux, protocoles, adressage IP et services réseau.",
      type: "QCM",
      questions: 15,
      difficulty: "Difficile",
      date: "28 septembre 2026",
      icon: "◈",
      generatedByAI: true,
    },
    {
      id: 3,
      title: "Linux Administration",
      description:
        "Questions sur Linux, commandes système et administration.",
      type: "Vrai/Faux",
      questions: 12,
      difficulty: "Facile",
      date: "25 septembre 2026",
      icon: "⌘",
      generatedByAI: true,
    },
  ]);

  const [openMenuId, setOpenMenuId] = useState(null);

  /* =====================================================
     RECHERCHE + FILTRE
  ===================================================== */

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        quiz.title.toLowerCase().includes(searchValue) ||
        quiz.description.toLowerCase().includes(searchValue);

      const matchesFilter =
        filter === "Tous" || quiz.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [quizzes, search, filter]);

  /* =====================================================
     STATISTIQUES
  ===================================================== */

  const totalQuizzes = quizzes.length;

  const aiQuizzes = quizzes.filter(
    (quiz) => quiz.generatedByAI
  ).length;

  const totalQuestions = quizzes.reduce(
    (total, quiz) => total + quiz.questions,
    0
  );

  const thisMonth = quizzes.filter((quiz) =>
    quiz.date.includes("septembre 2026")
  ).length;

  /* =====================================================
     SUPPRIMER UN QUIZ
  ===================================================== */

  const handleDeleteQuiz = (id) => {
    const quiz = quizzes.find(
      (item) => item.id === id
    );

    if (!quiz) {
      return;
    }

    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le quiz "${quiz.title}" ?`
    );

    if (!confirmed) {
      return;
    }

    setQuizzes((currentQuizzes) =>
      currentQuizzes.filter(
        (item) => item.id !== id
      )
    );

    setOpenMenuId(null);
  };

  /* =====================================================
     MODIFIER UN QUIZ
  ===================================================== */

  const handleEditQuiz = (id) => {
    setOpenMenuId(null);

    navigate("/generated-quiz", {
      state: {
        quizId: id,
        mode: "edit",
      },
    });
  };

  /* =====================================================
     OUVRIR UN QUIZ
  ===================================================== */

  const handleOpenQuiz = (id) => {
    navigate("/generated-quiz", {
      state: {
        quizId: id,
      },
    });
  };

  return (
    <DashboardLayout activePage="quizzes">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="quizzes-header">

        <div>

          <span className="page-eyebrow">
            VOTRE BIBLIOTHÈQUE
          </span>

          <h1>
            Mes quiz
          </h1>

          <p>
            Retrouvez, consultez et gérez tous vos quiz
            créés avec ExoCraft.
          </p>

        </div>

        <button
          type="button"
          className="quizzes-create-button"
          onClick={() => navigate("/generator")}
        >
          <span>
            ✦
          </span>

          Créer un quiz
        </button>

      </div>

      {/* =====================================================
          STATISTIQUES
      ===================================================== */}

      <div className="quizzes-stats">

        <div className="quiz-stat-card">

          <div className="quiz-stat-icon purple">
            ▧
          </div>

          <div>

            <span>
              Total des quiz
            </span>

            <strong>
              {totalQuizzes}
            </strong>

          </div>

        </div>

        <div className="quiz-stat-card">

          <div className="quiz-stat-icon blue">
            ✦
          </div>

          <div>

            <span>
              Créés avec l'IA
            </span>

            <strong>
              {aiQuizzes}
            </strong>

          </div>

        </div>

        <div className="quiz-stat-card">

          <div className="quiz-stat-icon green">
            ✓
          </div>

          <div>

            <span>
              Questions générées
            </span>

            <strong>
              {totalQuestions}
            </strong>

          </div>

        </div>

        <div className="quiz-stat-card">

          <div className="quiz-stat-icon orange">
            ◷
          </div>

          <div>

            <span>
              Ce mois-ci
            </span>

            <strong>
              {thisMonth}
            </strong>

          </div>

        </div>

      </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="quizzes-toolbar">

        <div className="quiz-search">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Rechercher un quiz..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        <div className="quiz-filters">

          <button
            type="button"
            className={
              filter === "Tous"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("Tous")
            }
          >
            Tous
          </button>

          <button
            type="button"
            className={
              filter === "QCM"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("QCM")
            }
          >
            QCM
          </button>

          <button
            type="button"
            className={
              filter === "Vrai/Faux"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("Vrai/Faux")
            }
          >
            Vrai/Faux
          </button>

        </div>

      </div>

      {/* =====================================================
          SECTION TITLE
      ===================================================== */}

      <div className="quizzes-section-heading">

        <div>

          <h2>
            Vos quiz
          </h2>

          <span>
            {filteredQuizzes.length} quiz disponible
            {filteredQuizzes.length > 1
              ? "s"
              : ""}
          </span>

        </div>

      </div>

      {/* =====================================================
          QUIZ CARDS
      ===================================================== */}

      {filteredQuizzes.length > 0 ? (

        <div className="quizzes-grid">

          {filteredQuizzes.map((quiz) => (

            <article
              className="professional-quiz-card"
              key={quiz.id}
            >

              {/* CARD TOP */}

              <div className="quiz-card-top">

                <div className="quiz-card-icon">
                  {quiz.icon}
                </div>

                <div className="quiz-menu-wrapper">

                  <button
                    type="button"
                    className="quiz-more-button"
                    title="Plus d'options"
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === quiz.id
                          ? null
                          : quiz.id
                      )
                    }
                  >
                    ⋮
                  </button>

                  {openMenuId === quiz.id && (

                    <div className="quiz-dropdown-menu">

                      <button
                        type="button"
                        onClick={() =>
                          handleEditQuiz(
                            quiz.id
                          )
                        }
                      >
                        ✏ Modifier
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteQuiz(
                            quiz.id
                          )
                        }
                      >
                        🗑 Supprimer
                      </button>

                    </div>

                  )}

                </div>

              </div>

              {/* CONTENT */}

              <div className="quiz-card-content">

                <div className="quiz-type">
                  {quiz.type}
                </div>

                <h3>
                  {quiz.title}
                </h3>

                <p>
                  {quiz.description}
                </p>

              </div>

              {/* META */}

              <div className="quiz-card-meta">

                <span>
                  <strong>
                    {quiz.questions}
                  </strong>{" "}
                  questions
                </span>

                <span className="meta-separator">
                  •
                </span>

                <span>
                  {quiz.difficulty}
                </span>

              </div>

              {/* FOOTER */}

              <div className="quiz-card-footer">

                <span className="quiz-date">
                  Créé le {quiz.date}
                </span>

                <button
                  type="button"
                  className="quiz-open-button"
                  onClick={() =>
                    handleOpenQuiz(
                      quiz.id
                    )
                  }
                >
                  Ouvrir
                  <span>
                    →
                  </span>
                </button>

              </div>

            </article>

          ))}

        </div>

      ) : (

        /* =================================================
           EMPTY STATE
        ================================================= */

        <div className="quizzes-empty">

          <div className="empty-icon">
            ⌕
          </div>

          <h3>
            Aucun quiz trouvé
          </h3>

          <p>
            Essayez une autre recherche ou créez
            un nouveau quiz.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/generator")
            }
          >
            Créer un quiz
          </button>

        </div>

      )}

    </DashboardLayout>
  );
}

export default MyQuizzes;