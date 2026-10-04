import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function Generator() {
  const navigate = useNavigate();
  const location = useLocation();

  /*
    =====================================================
    ARCHIVE SÉLECTIONNÉE DEPUIS LA PAGE ARCHIVES
    =====================================================
  */

  const selectedArchive =
    location.state?.archive || null;


  /*
    =====================================================
    TYPE DE CONTENU
    =====================================================
  */

  const [contentType, setContentType] = useState(
    selectedArchive
      ? selectedArchive.type === "exam"
        ? "exam"
        : "course"
      : "course"
  );


  /*
    =====================================================
    CONTEXTE PÉDAGOGIQUE
    =====================================================
  */

  const [subject, setSubject] = useState(
    selectedArchive?.subject || ""
  );

  const [promotion, setPromotion] = useState(
    selectedArchive?.promotion || ""
  );


  /*
    =====================================================
    THÈME
    =====================================================
  */

  const [theme, setTheme] = useState(
    selectedArchive?.title || ""
  );


  /*
    =====================================================
    QUIZ
    =====================================================
  */

  const [difficulty, setDifficulty] =
    useState("medium");

  const [questionCount, setQuestionCount] =
    useState(10);


  /*
    =====================================================
    EXAMEN
    =====================================================
  */

  const [duration, setDuration] =
    useState(60);

  const [grading, setGrading] =
    useState(20);

  const [instructions, setInstructions] =
    useState("");


  /*
    =====================================================
    ARCHIVE
    =====================================================
  */

  const [useArchive, setUseArchive] =
    useState(!!selectedArchive);

  const [archive, setArchive] =
    useState(
      selectedArchive?.id || ""
    );


  /*
    =====================================================
    VARIANTES
    =====================================================
  */

  const [variants, setVariants] =
    useState(false);


  /*
    =====================================================
    DONNÉES TEMPORAIRES FRONTEND
    =====================================================

    Elles seront remplacées plus tard par le backend.
  */

  const subjects = [
    "Cloud Computing",
    "Réseaux informatiques",
  ];

  const promotions = [
    "Cycle ingénieur",
  ];

  const archives = [
    {
      id: 1,
      title: "Introduction au Cloud Computing",
      type: "course",
      subject: "Cloud Computing",
      promotion: "Cycle ingénieur",
    },
    {
      id: 2,
      title: "Architecture Cloud",
      type: "course",
      subject: "Cloud Computing",
      promotion: "Cycle ingénieur",
    },
  ];


  /*
    =====================================================
    TYPES DE CONTENU
    =====================================================
  */

  const contentTypes = [
    {
      id: "course",
      label: "Cours",
      icon: "📘",
      description:
        "Créer un cours à partir d'un thème ou d'un plan.",
    },

    {
      id: "summary",
      label: "Résumé",
      icon: "📄",
      description:
        "Générer un résumé pédagogique à partir d'un thème ou d'un plan.",
    },

    {
      id: "exercises",
      label: "Série d'exercices",
      icon: "✎",
      description:
        "Générer une série d'exercices à partir d'un thème.",
    },

    {
      id: "quiz",
      label: "Quiz",
      icon: "☑",
      description:
        "Créer un quiz à choix multiples configurable.",
    },

    {
      id: "exam",
      label: "Examen",
      icon: "📋",
      description:
        "Créer un examen avec durée, barème et consignes.",
    },
  ];


  /*
    =====================================================
    CHANGEMENT DE TYPE
    =====================================================
  */

  const handleTypeChange = (type) => {
    setContentType(type);

    setUseArchive(false);
    setArchive("");

    setVariants(false);
  };


  /*
    =====================================================
    GÉNÉRATION
    =====================================================
  */

  const handleGenerate = (event) => {
    event.preventDefault();


    /*
      Vérification matière
    */

    if (!subject) {
      alert(
        "Veuillez sélectionner une matière."
      );

      return;
    }


    /*
      Vérification promotion
    */

    if (!promotion) {
      alert(
        "Veuillez sélectionner une promotion."
      );

      return;
    }


    /*
      Vérification thème
    */

    if (!theme.trim()) {
      alert(
        "Veuillez saisir un thème ou un plan."
      );

      return;
    }


    /*
      Vérification archive
    */

    if (useArchive && !archive) {
      alert(
        "Veuillez sélectionner une archive."
      );

      return;
    }


    /*
      =====================================================
      DONNÉES DE LA GÉNÉRATION
      =====================================================
    */

    const generationData = {
      type: contentType,

      subject,

      promotion,

      theme: theme.trim(),

      difficulty:
        contentType === "quiz"
          ? difficulty
          : null,

      questionCount:
        contentType === "quiz"
          ? questionCount
          : null,

      duration:
        contentType === "exam"
          ? duration
          : null,

      grading:
        contentType === "exam"
          ? grading
          : null,

      instructions:
        contentType === "exam"
          ? instructions.trim()
          : null,

      useArchive,

      archive:
        useArchive
          ? archive
          : null,

      variants:
        contentType === "quiz" ||
        contentType === "exam"
          ? variants
          : false,
    };


    /*
      Sauvegarder la génération actuelle
    */

    sessionStorage.setItem(
      "exocraft_generation",
      JSON.stringify(
        generationData
      )
    );


    /*
      =====================================================
      CRÉATION DU CONTENU FRONTEND
      =====================================================
    */

    const newContent = {
      id: Date.now(),

      type: contentType,

      /*
        Le titre correspond au thème.
      */

      title: theme.trim(),

      /*
        Matière sélectionnée.
      */

      subject,

      /*
        Thème.
      */

      theme: theme.trim(),

      /*
        Promotion.
      */

      promotion,

      /*
        Brouillon par défaut.
      */

      status: "draft",

      /*
        Privé par défaut.
      */

      visibility: "private",

      /*
        Date.
      */

      createdAt:
        new Date().toLocaleDateString(
          "fr-FR"
        ),

      /*
        Quiz.
      */

      difficulty:
        contentType === "quiz"
          ? difficulty
          : null,

      questionCount:
        contentType === "quiz"
          ? questionCount
          : null,

      /*
        Examen.
      */

      duration:
        contentType === "exam"
          ? duration
          : null,

      grading:
        contentType === "exam"
          ? grading
          : null,

      instructions:
        contentType === "exam"
          ? instructions.trim()
          : null,

      /*
        Variantes.
      */

      variants:
        contentType === "quiz" ||
        contentType === "exam"
          ? variants
          : false,

      /*
        Archive.
      */

      useArchive,

      archive:
        useArchive
          ? archive
          : null,
    };


    /*
      =====================================================
      RÉCUPÉRER LES CONTENUS EXISTANTS
      =====================================================
    */

    const savedContents =
      JSON.parse(
        localStorage.getItem(
          "exocraft_contents"
        )
      ) || [];


    /*
      Ajouter le nouveau contenu
    */

    const updatedContents = [
      newContent,
      ...savedContents,
    ];


    /*
      Sauvegarder
    */

    localStorage.setItem(
      "exocraft_contents",
      JSON.stringify(
        updatedContents
      )
    );


    /*
      =====================================================
      REDIRECTION
      =====================================================
    */

    if (contentType === "quiz") {
      navigate("/generated-quiz");
      return;
    }

    if (contentType === "exam") {
      navigate("/generated-exam");
      return;
    }

    if (contentType === "course") {
      navigate("/generated-course");
      return;
    }

    if (contentType === "summary") {
      navigate("/generated-course");
      return;
    }

    if (contentType === "exercises") {
      navigate("/generated-exercises");
    }
  };


  /*
    =====================================================
    TYPE SÉLECTIONNÉ
    =====================================================
  */

  const selectedType =
    contentTypes.find(
      (type) =>
        type.id === contentType
    );


  return (
    <DashboardLayout
      activePage="generator"
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="generator-header">

        <div>

          <span className="dashboard-eyebrow">
            GÉNÉRATION IA
          </span>

          <h1>
            Créez votre contenu pédagogique
          </h1>

          <p>
            Choisissez un type de contenu et
            définissez les informations nécessaires
            à sa génération.
          </p>

        </div>

      </section>


      {/* =================================================
          TYPE DE CONTENU
      ================================================= */}

      <section className="generator-section">

        <div className="generator-section-header">

          <div>

            <span className="generator-section-number">
              01
            </span>

            <div>

              <h2>
                Type de contenu
              </h2>

              <p>
                Sélectionnez le contenu que vous
                souhaitez créer.
              </p>

            </div>

          </div>

        </div>


        <div className="generator-type-grid">

          {contentTypes.map((type) => (

            <button
              type="button"
              key={type.id}
              className={
                contentType === type.id
                  ? "generator-type-card active"
                  : "generator-type-card"
              }
              onClick={() =>
                handleTypeChange(
                  type.id
                )
              }
            >

              <div className="generator-type-icon">
                {type.icon}
              </div>

              <div className="generator-type-content">

                <h3>
                  {type.label}
                </h3>

                <p>
                  {type.description}
                </p>

              </div>

              <div className="generator-type-check">

                {contentType === type.id
                  ? "✓"
                  : ""}

              </div>

            </button>

          ))}

        </div>

      </section>


      {/* =================================================
          FORMULAIRE
      ================================================= */}

      <form
        className="generator-form"
        onSubmit={handleGenerate}
      >

        {/* =================================================
            CONTEXTE PÉDAGOGIQUE
        ================================================= */}

        <section className="generator-section">

          <div className="generator-section-header">

            <div>

              <span className="generator-section-number">
                02
              </span>

              <div>

                <h2>
                  Contexte pédagogique
                </h2>

                <p>
                  Sélectionnez la matière et la
                  promotion concernées.
                </p>

              </div>

            </div>

          </div>


          <div className="generator-fields-grid">

            {/* MATIÈRE */}

            <div className="generator-field">

              <label htmlFor="subject">
                Matière
              </label>

              <select
                id="subject"
                value={subject}
                onChange={(event) =>
                  setSubject(
                    event.target.value
                  )
                }
                required
              >

                <option value="">
                  Sélectionner une matière
                </option>

                {subjects.map((item) => (

                  <option
                    value={item}
                    key={item}
                  >
                    {item}
                  </option>

                ))}

              </select>

            </div>


            {/* PROMOTION */}

            <div className="generator-field">

              <label htmlFor="promotion">
                Promotion
              </label>

              <select
                id="promotion"
                value={promotion}
                onChange={(event) =>
                  setPromotion(
                    event.target.value
                  )
                }
                required
              >

                <option value="">
                  Sélectionner une promotion
                </option>

                {promotions.map((item) => (

                  <option
                    value={item}
                    key={item}
                  >
                    {item}
                  </option>

                ))}

              </select>

            </div>

          </div>

        </section>


        {/* =================================================
            THÈME
        ================================================= */}

        <section className="generator-section">

          <div className="generator-section-header">

            <div>

              <span className="generator-section-number">
                03
              </span>

              <div>

                <h2>
                  Thème ou plan
                </h2>

                <p>
                  Décrivez le contenu que vous
                  souhaitez générer.
                </p>

              </div>

            </div>

          </div>


          <div className="generator-field">

            <label htmlFor="theme">
              Thème ou plan
            </label>

            <textarea
              id="theme"
              value={theme}
              onChange={(event) =>
                setTheme(
                  event.target.value
                )
              }
              placeholder={
                "Exemple : Introduction au Cloud Computing, modèles de service IaaS, PaaS et SaaS..."
              }
              rows={6}
              required
            />

          </div>

        </section>


        {/* =================================================
            PARAMÈTRES QUIZ
        ================================================= */}

        {contentType === "quiz" && (

          <section className="generator-section">

            <div className="generator-section-header">

              <div>

                <span className="generator-section-number">
                  04
                </span>

                <div>

                  <h2>
                    Paramètres du quiz
                  </h2>

                  <p>
                    Configurez le niveau et le
                    nombre de questions.
                  </p>

                </div>

              </div>

            </div>


            <div className="generator-fields-grid">

              {/* DIFFICULTÉ */}

              <div className="generator-field">

                <label htmlFor="difficulty">
                  Difficulté
                </label>

                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(event) =>
                    setDifficulty(
                      event.target.value
                    )
                  }
                >

                  <option value="easy">
                    Facile
                  </option>

                  <option value="medium">
                    Moyenne
                  </option>

                  <option value="difficult">
                    Difficile
                  </option>

                </select>

              </div>


              {/* QUESTIONS */}

              <div className="generator-field">

                <label htmlFor="questionCount">
                  Nombre de questions
                </label>

                <input
                  type="number"
                  id="questionCount"
                  min="1"
                  value={questionCount}
                  onChange={(event) =>
                    setQuestionCount(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  required
                />

              </div>

            </div>


            <label className="generator-checkbox">

              <input
                type="checkbox"
                checked={variants}
                onChange={(event) =>
                  setVariants(
                    event.target.checked
                  )
                }
              />

              <span>
                Générer des variantes de ce quiz
              </span>

            </label>

          </section>

        )}


        {/* =================================================
            PARAMÈTRES EXAMEN
        ================================================= */}

        {contentType === "exam" && (

          <section className="generator-section">

            <div className="generator-section-header">

              <div>

                <span className="generator-section-number">
                  04
                </span>

                <div>

                  <h2>
                    Paramètres de l'examen
                  </h2>

                  <p>
                    Définissez la durée, le barème
                    et les consignes.
                  </p>

                </div>

              </div>

            </div>


            <div className="generator-fields-grid">

              {/* DURÉE */}

              <div className="generator-field">

                <label htmlFor="duration">
                  Durée (minutes)
                </label>

                <input
                  type="number"
                  id="duration"
                  min="1"
                  value={duration}
                  onChange={(event) =>
                    setDuration(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  required
                />

              </div>


              {/* BARÈME */}

              <div className="generator-field">

                <label htmlFor="grading">
                  Barème
                </label>

                <input
                  type="number"
                  id="grading"
                  min="1"
                  value={grading}
                  onChange={(event) =>
                    setGrading(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  required
                />

              </div>

            </div>


            {/* CONSIGNES */}

            <div className="generator-field">

              <label htmlFor="instructions">
                Consignes
              </label>

              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) =>
                  setInstructions(
                    event.target.value
                  )
                }
                placeholder="Saisissez les consignes de l'examen..."
                rows={5}
              />

            </div>


            {/* VARIANTES */}

            <label className="generator-checkbox">

              <input
                type="checkbox"
                checked={variants}
                onChange={(event) =>
                  setVariants(
                    event.target.checked
                  )
                }
              />

              <span>
                Générer des variantes de cet examen
              </span>

            </label>

          </section>

        )}


        {/* =================================================
            ARCHIVE PÉDAGOGIQUE
        ================================================= */}

        <section className="generator-section">

          <div className="generator-section-header">

            <div>

              <span className="generator-section-number">

                {contentType === "quiz" ||
                contentType === "exam"
                  ? "05"
                  : "04"}

              </span>

              <div>

                <h2>
                  Archive pédagogique
                </h2>

                <p>
                  Utilisez une archive accessible
                  comme base pour votre génération.
                </p>

              </div>

            </div>

          </div>


          <label className="generator-checkbox">

            <input
              type="checkbox"
              checked={useArchive}
              onChange={(event) =>
                setUseArchive(
                  event.target.checked
                )
              }
            />

            <span>
              Utiliser une archive comme base
            </span>

          </label>


          {useArchive && (

            <div className="generator-field archive-field">

              <label htmlFor="archive">
                Archive
              </label>

              <select
                id="archive"
                value={archive}
                onChange={(event) =>
                  setArchive(
                    event.target.value
                  )
                }
                required
              >

                <option value="">
                  Sélectionner une archive
                </option>

                {archives
                  .filter(
                    (item) =>
                      (!subject ||
                        item.subject ===
                          subject) &&
                      (!promotion ||
                        item.promotion ===
                          promotion)
                  )
                  .map((item) => (

                    <option
                      value={item.id}
                      key={item.id}
                    >
                      {item.title} —{" "}
                      {item.type === "course"
                        ? "Cours"
                        : "Examen"}
                    </option>

                  ))}

              </select>

            </div>

          )}

        </section>


        {/* =================================================
            RÉSUMÉ
        ================================================= */}

        <section className="generator-summary">

          <div className="generator-summary-info">

            <span className="generator-summary-label">
              VOTRE GÉNÉRATION
            </span>

            <h2>
              {selectedType?.label}
            </h2>

            <p>

              {subject
                ? subject
                : "Matière non sélectionnée"}

              {" • "}

              {promotion
                ? promotion
                : "Promotion non sélectionnée"}

            </p>

          </div>


          <button
            type="submit"
            className="generator-submit-button"
          >

            <span>
              ✦
            </span>

            Générer le contenu

            <span>
              →
            </span>

          </button>

        </section>

      </form>

    </DashboardLayout>
  );
}

export default Generator;