import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";


/*
=========================================================
DONNÉES DE DÉMONSTRATION

Elles sont utilisées uniquement si aucun contenu
n'existe encore dans localStorage.
=========================================================
*/

const demoContents = [
  {
    id: "demo-course-1",
    type: "course",
    title: "Introduction au Cloud Computing",
    theme: "Cloud Computing",
    status: "draft",
    visibility: "private",
    createdAt: "04/10/2026",
  },

  {
    id: "demo-summary-1",
    type: "summary",
    title: "Résumé des modèles Cloud",
    theme: "IaaS, PaaS et SaaS",
    status: "valid",
    visibility: "private",
    createdAt: "03/10/2026",
  },

  {
    id: "demo-exercises-1",
    type: "exercises",
    title: "Série d'exercices — Réseaux",
    theme: "Adressage IP",
    status: "draft",
    visibility: "private",
    createdAt: "02/10/2026",
  },

  {
    id: "demo-quiz-1",
    type: "quiz",
    title: "Quiz — Cloud Computing",
    theme: "Virtualisation et Cloud",
    difficulty: "medium",
    questionCount: 10,
    status: "valid",
    visibility: "public",
    createdAt: "01/10/2026",
  },

  {
    id: "demo-exam-1",
    type: "exam",
    title: "Examen — Réseaux informatiques",
    theme: "Réseaux TCP/IP",
    duration: 90,
    grading: 20,
    status: "draft",
    visibility: "private",
    createdAt: "30/09/2026",
  },
];


/*
=========================================================
COMPOSANT
=========================================================
*/

function MyContent() {

  const navigate = useNavigate();


  /*
  =======================================================
  FILTRES
  =======================================================
  */

  const [
    filterType,
    setFilterType,
  ] = useState("all");


  const [
    filterStatus,
    setFilterStatus,
  ] = useState("all");


  const [
    filterVisibility,
    setFilterVisibility,
  ] = useState("all");


  /*
  =======================================================
  CONTENUS

  On récupère maintenant les vrais contenus
  depuis localStorage.
  =======================================================
  */

  const [
    contents,
    setContents,
  ] = useState(() => {

    const savedContents =
      localStorage.getItem(
        "exocraft_contents"
      );


    if (savedContents) {

      try {

        const parsedContents =
          JSON.parse(
            savedContents
          );


        if (
          Array.isArray(
            parsedContents
          )
        ) {

          return parsedContents;
        }

      } catch (error) {

        console.error(
          "Erreur lors de la lecture des contenus :",
          error
        );

      }
    }


    return demoContents;
  });


  /*
  =======================================================
  TYPES DE CONTENU
  =======================================================
  */

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


  /*
  =======================================================
  SYNCHRONISER AVEC LOCALSTORAGE
  =======================================================
  */

  useEffect(() => {

    localStorage.setItem(
      "exocraft_contents",
      JSON.stringify(contents)
    );

  }, [contents]);


  /*
  =======================================================
  FILTRAGE
  =======================================================
  */

  const filteredContents =
    contents.filter(
      (content) => {

        const typeMatches =
          filterType === "all" ||
          content.type === filterType;


        const statusMatches =
          filterStatus === "all" ||
          content.status === filterStatus;


        const visibilityMatches =
          filterVisibility === "all" ||
          content.visibility ===
            filterVisibility;


        return (
          typeMatches &&
          statusMatches &&
          visibilityMatches
        );
      }
    );


  /*
  =======================================================
  SUPPRIMER UN CONTENU
  =======================================================
  */

  const handleDelete = (
    id
  ) => {

    const confirmed =
      window.confirm(
        "Voulez-vous vraiment supprimer ce contenu ?"
      );


    if (!confirmed) {
      return;
    }


    setContents(
      (currentContents) =>
        currentContents.filter(
          (content) =>
            content.id !== id
        )
    );
  };


  /*
  =======================================================
  CONSULTER UN CONTENU
  =======================================================
  */

  const handleView = (
    content
  ) => {

    /*
    -----------------------------------------------------
    QUIZ
    -----------------------------------------------------
    */

    if (
      content.type === "quiz"
    ) {

      /*
      On transmet directement
      le contenu sélectionné à
      GeneratedQuiz.
      */

      navigate(
        "/generated-quiz",
        {
          state: {

            context:
              content.theme ||
              content.title,

            title:
              content.title,

            difficulty:
              content.difficulty ||
              "Moyenne",

            questionCount:
              content.questionCount ||
              content.questions?.length ||
              10,

            generationType:
              content.generationType ||
              "QCM",

            questions:
              content.questions ||
              [],

            selectedSources:
              content.selectedSources ||
              [],
          },
        }
      );

      return;
    }


    /*
    -----------------------------------------------------
    EXAMEN
    -----------------------------------------------------
    */

    if (
      content.type === "exam"
    ) {

      navigate(
        "/generated-exam",
        {
          state: {
            ...content,
          },
        }
      );

      return;
    }


    /*
    -----------------------------------------------------
    COURS / RÉSUMÉ
    -----------------------------------------------------
    */

    if (
      content.type === "course" ||
      content.type === "summary"
    ) {

      navigate(
        "/generated-course",
        {
          state: {
            ...content,
          },
        }
      );

      return;
    }


    /*
    -----------------------------------------------------
    AUTRES TYPES
    -----------------------------------------------------
    */

    alert(
      `Consultation de « ${content.title} »`
    );
  };


  /*
  =======================================================
  MODIFIER UN CONTENU
  =======================================================
  */

  const handleEdit = (
    content
  ) => {

    /*
    Pour le moment, les pages
    d'édition détaillées seront
    reliées progressivement.

    Le backend pourra ensuite
    utiliser les routes PATCH.
    */

    if (
      content.type === "quiz"
    ) {

      handleView(
        content
      );

      return;
    }


    alert(
      `Modification de « ${content.title} »`
    );
  };


  /*
  =======================================================
  LABEL STATUT
  =======================================================
  */

  const getStatusLabel = (
    status
  ) => {

    if (
      status === "valid"
    ) {

      return "Validé";
    }


    return "Brouillon";
  };


  /*
  =======================================================
  LABEL VISIBILITÉ
  =======================================================
  */

  const getVisibilityLabel = (
    visibility
  ) => {

    if (
      visibility === "public"
    ) {

      return "Public";
    }


    return "Privé";
  };


  /*
  =======================================================
  LABEL DIFFICULTÉ
  =======================================================
  */

  const getDifficultyLabel = (
    difficulty
  ) => {

    if (
      difficulty === "easy"
    ) {

      return "Facile";
    }


    if (
      difficulty === "difficult"
    ) {

      return "Difficile";
    }


    if (
      difficulty === "hard"
    ) {

      return "Difficile";
    }


    /*
    Si Generator utilise
    "Moyenne" directement.
    */

    if (
      difficulty === "Moyenne"
    ) {

      return "Moyenne";
    }


    return "Moyenne";
  };


  /*
  =======================================================
  RENDER
  =======================================================
  */

  return (

    <DashboardLayout
      activePage="contents"
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="contents-header">

        <div>

          <span className="dashboard-eyebrow">
            MES CONTENUS
          </span>


          <h1>
            Mes contenus pédagogiques
          </h1>


          <p>
            Consultez et gérez les contenus
            que vous avez créés sur ExoCraft.
          </p>

        </div>


        <button
          type="button"
          className="contents-create-button"
          onClick={() =>
            navigate("/generator")
          }
        >

          <span>
            ✦
          </span>

          Créer un contenu

        </button>

      </section>


      {/* =================================================
          FILTRES
      ================================================= */}

      <section className="contents-filters">

        {/* TYPE */}

        <div className="contents-filter-group">

          <label htmlFor="content-type">
            Type
          </label>


          <select
            id="content-type"
            value={filterType}
            onChange={(event) =>
              setFilterType(
                event.target.value
              )
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


        {/* STATUT */}

        <div className="contents-filter-group">

          <label htmlFor="content-status">
            Statut
          </label>


          <select
            id="content-status"
            value={filterStatus}
            onChange={(event) =>
              setFilterStatus(
                event.target.value
              )
            }
          >

            <option value="all">
              Tous les statuts
            </option>

            <option value="draft">
              Brouillon
            </option>

            <option value="valid">
              Validé
            </option>

          </select>

        </div>


        {/* VISIBILITÉ */}

        <div className="contents-filter-group">

          <label htmlFor="content-visibility">
            Visibilité
          </label>


          <select
            id="content-visibility"
            value={
              filterVisibility
            }
            onChange={(event) =>
              setFilterVisibility(
                event.target.value
              )
            }
          >

            <option value="all">
              Toutes
            </option>

            <option value="private">
              Privé
            </option>

            <option value="public">
              Public
            </option>

          </select>

        </div>

      </section>


      {/* =================================================
          LISTE
      ================================================= */}

      <section className="contents-list-section">

        <div className="contents-list-header">

          <div>

            <span className="contents-list-label">
              CONTENUS
            </span>


            <h2>

              {filteredContents.length}

              {" "}

              contenu
              {filteredContents.length !==
              1
                ? "s"
                : ""}

            </h2>

          </div>

        </div>


        {/* =================================================
            AUCUN CONTENU
        ================================================= */}

        {filteredContents.length === 0 ? (

          <div className="contents-empty">

            <div className="contents-empty-icon">
              ▤
            </div>


            <h3>
              Aucun contenu trouvé
            </h3>


            <p>
              Aucun contenu ne correspond
              aux filtres sélectionnés.
            </p>


            <button
              type="button"
              onClick={() =>
                navigate("/generator")
              }
            >

              Créer un contenu

              <span>
                →
              </span>

            </button>

          </div>

        ) : (

          /* =================================================
             CARTES
          ================================================= */

          <div className="contents-grid">

            {filteredContents.map(
              (content) => {

                const type =
                  contentTypes[
                    content.type
                  ] ||
                  {
                    label:
                      "Contenu",
                    icon:
                      "📄",
                  };


                return (

                  <article
                    className="content-card"
                    key={
                      content.id
                    }
                  >

                    {/* CARD TOP */}

                    <div className="content-card-top">

                      <div className="content-type">

                        <div className="content-type-icon">
                          {type.icon}
                        </div>


                        <span>
                          {type.label}
                        </span>

                      </div>


                      <span
                        className={
                          content.status ===
                          "valid"
                            ? "content-status valid"
                            : "content-status draft"
                        }
                      >

                        {getStatusLabel(
                          content.status
                        )}

                      </span>

                    </div>


                    {/* TITLE */}

                    <h3>
                      {content.title}
                    </h3>


                    {/* THEME */}

                    <p className="content-theme">
                      {content.theme}
                    </p>


                    {/* DETAILS */}

                    <div className="content-details">

                      {/* QUIZ */}

                      {content.type ===
                        "quiz" && (

                        <>

                          <div>

                            <span>
                              Difficulté
                            </span>


                            <strong>
                              {getDifficultyLabel(
                                content.difficulty
                              )}
                            </strong>

                          </div>


                          <div>

                            <span>
                              Questions
                            </span>


                            <strong>
                              {
                                content.questionCount ||
                                content.questions?.length ||
                                "-"
                              }
                            </strong>

                          </div>

                        </>
                      )}


                      {/* EXAMEN */}

                      {content.type ===
                        "exam" && (

                        <>

                          <div>

                            <span>
                              Durée
                            </span>


                            <strong>
                              {content.duration ||
                                "-"}{" "}
                              min
                            </strong>

                          </div>


                          <div>

                            <span>
                              Barème
                            </span>


                            <strong>
                              {content.grading ||
                                "-"}{" "}
                              pts
                            </strong>

                          </div>

                        </>
                      )}


                      {/* VISIBILITÉ */}

                      <div>

                        <span>
                          Visibilité
                        </span>


                        <strong>
                          {getVisibilityLabel(
                            content.visibility
                          )}
                        </strong>

                      </div>

                    </div>


                    {/* FOOTER */}

                    <div className="content-card-footer">

                      <span className="content-date">

                        {content.createdAt ||
                          "—"}

                      </span>


                      <div className="content-actions">

                        <button
                          type="button"
                          className="content-view-button"
                          onClick={() =>
                            handleView(
                              content
                            )
                          }
                        >
                          Consulter
                        </button>


                        <button
                          type="button"
                          className="content-edit-button"
                          onClick={() =>
                            handleEdit(
                              content
                            )
                          }
                        >
                          Modifier
                        </button>


                        <button
                          type="button"
                          className="content-delete-button"
                          onClick={() =>
                            handleDelete(
                              content.id
                            )
                          }
                          title="Supprimer"
                        >
                          ×
                        </button>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>
        )}

      </section>

    </DashboardLayout>
  );
}


export default MyContent;