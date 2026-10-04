import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function GeneratedExam() {
  const navigate = useNavigate();
  const location = useLocation();

  const context =
    location.state?.context || "Cloud Computing";

  const difficulty =
    location.state?.difficulty || "Moyenne";

  const requestedQuestionCount =
    Number(location.state?.questionCount) || 10;

  const selectedSources =
    location.state?.selectedSources || [];

  const [examTitle, setExamTitle] = useState(
    `Examen de ${context}`
  );

  const [questions, setQuestions] = useState([
    {
      id: 1,
      section: "Partie I — Concepts fondamentaux",
      question:
        context === "Cloud Computing"
          ? "Expliquez les principaux modèles de services du Cloud Computing et donnez un exemple pour chacun."
          : context === "Réseaux informatiques"
          ? "Expliquez la différence entre une adresse IP privée et une adresse IP publique."
          : "Expliquez le rôle de LVM dans l'administration d'un système Linux.",
      points: 4,
      answer: "",
    },
    {
      id: 2,
      section: "Partie I — Concepts fondamentaux",
      question:
        context === "Cloud Computing"
          ? "Comparez un Cloud public, un Cloud privé et un Cloud hybride."
          : context === "Réseaux informatiques"
          ? "Expliquez le rôle du protocole DHCP dans un réseau informatique."
          : "Expliquez la différence entre une partition classique et un volume logique LVM.",
      points: 4,
      answer: "",
    },
    {
      id: 3,
      section: "Partie II — Mise en pratique",
      question:
        context === "Cloud Computing"
          ? "Expliquez pourquoi l'élasticité est importante dans une infrastructure Cloud."
          : context === "Réseaux informatiques"
          ? "Expliquez le fonctionnement général de la résolution DNS."
          : "Expliquez le fonctionnement d'un montage NFS entre un serveur et un client Linux.",
      points: 4,
      answer: "",
    },
    {
      id: 4,
      section: "Partie II — Mise en pratique",
      question:
        context === "Cloud Computing"
          ? "Présentez deux mécanismes permettant d'améliorer la disponibilité d'une application Cloud."
          : context === "Réseaux informatiques"
          ? "Expliquez le rôle d'un routeur dans un réseau."
          : "Expliquez le rôle de cron dans l'administration Linux et donnez un exemple d'utilisation.",
      points: 4,
      answer: "",
    },
    {
      id: 5,
      section: "Partie III — Analyse",
      question:
        context === "Cloud Computing"
          ? "Une application reçoit soudainement un nombre très important de requêtes. Quelle architecture Cloud proposeriez-vous et pourquoi ?"
          : context === "Réseaux informatiques"
          ? "Un poste ne peut plus accéder à Internet alors qu'il possède une adresse IP. Quelles vérifications effectueriez-vous ?"
          : "Un administrateur constate qu'un système Linux manque d'espace disque. Quelles commandes et méthodes utiliseriez-vous pour analyser et résoudre le problème ?",
      points: 4,
      answer: "",
    },
  ]);

  const handleAnswerChange = (id, value) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question) =>
        question.id === id
          ? {
              ...question,
              answer: value,
            }
          : question
      )
    );
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((currentQuestions) =>
      currentQuestions.filter(
        (question) => question.id !== id
      )
    );
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      section: "Nouvelle partie",
      question:
        "Saisissez ici votre question d'examen.",
      points: 2,
      answer: "",
    };

    setQuestions((currentQuestions) => [
      ...currentQuestions,
      newQuestion,
    ]);
  };

  const totalPoints = questions.reduce(
    (total, question) => total + Number(question.points),
    0
  );

  const handleValidateExam = () => {
    if (questions.length === 0) {
      alert(
        "L'examen doit contenir au moins une question."
      );
      return;
    }

    alert("Examen validé avec succès !");
  };

  const handleExport = () => {
    alert("Export de l'examen disponible prochainement.");
  };

  return (
    <DashboardLayout activePage="generator">
      {/* HEADER */}

      <section className="generated-exam-header">
        <div>
          <span className="page-label">
            EXAMEN GÉNÉRÉ PAR L'IA
          </span>

          <h1>{examTitle}</h1>

          <p>
            Vérifiez, personnalisez et préparez votre
            examen avant de l'utiliser.
          </p>
        </div>

        <div className="generated-exam-actions">
          <button
            type="button"
            className="outline-button"
            onClick={() => navigate("/generator")}
          >
            ← Modifier
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={handleExport}
          >
            ↓ Exporter
          </button>
        </div>
      </section>

      {/* INFORMATIONS */}

      <section className="generated-exam-info-grid">
        <div className="generated-exam-info-card">
          <span>TYPE</span>
          <strong>Examen</strong>
        </div>

        <div className="generated-exam-info-card">
          <span>CONTEXTE</span>
          <strong>{context}</strong>
        </div>

        <div className="generated-exam-info-card">
          <span>QUESTIONS</span>
          <strong>{requestedQuestionCount}</strong>
        </div>

        <div className="generated-exam-info-card">
          <span>DIFFICULTÉ</span>
          <strong>{difficulty}</strong>
        </div>
      </section>

      {/* PARAMÈTRES DE L'EXAMEN */}

      <section className="generated-exam-settings">
        <div className="exam-setting">
          <span>Durée</span>
          <strong>60 minutes</strong>
        </div>

        <div className="exam-setting">
          <span>Barème</span>
          <strong>{totalPoints} points</strong>
        </div>

        <div className="exam-setting">
          <span>Documents sources</span>
          <strong>
            {selectedSources.length}
          </strong>
        </div>
      </section>

      {/* TITRE */}

      <section className="generated-exam-title-card">
        <div className="exam-card-heading">
          <div className="exam-heading-icon">
            E
          </div>

          <div>
            <h2>Titre de l'examen</h2>

            <p>
              Personnalisez le titre de votre évaluation.
            </p>
          </div>
        </div>

        <input
          type="text"
          value={examTitle}
          onChange={(event) =>
            setExamTitle(event.target.value)
          }
          className="exam-title-input"
        />
      </section>

      {/* CONSIGNES */}

      <section className="generated-exam-instructions">
        <div className="exam-section-heading">
          <div>
            <span className="exam-section-number">
              01
            </span>

            <div>
              <h2>Consignes générales</h2>

              <p>
                Informations destinées aux étudiants.
              </p>
            </div>
          </div>
        </div>

        <ul>
          <li>
            Lisez attentivement toutes les questions
            avant de commencer.
          </li>

          <li>
            Justifiez vos réponses lorsque cela est
            nécessaire.
          </li>

          <li>
            Respectez le temps imparti pour l'examen.
          </li>

          <li>
            Vérifiez vos réponses avant de remettre
            votre copie.
          </li>
        </ul>
      </section>

      {/* QUESTIONS */}

      <section className="generated-exam-questions">
        <div className="generated-exam-section-header">
          <div>
            <h2>Sujet de l'examen</h2>

            <p>
              Modifiez les questions et adaptez le
              barème selon vos besoins.
            </p>
          </div>

          <span className="exam-question-count">
            {questions.length} question
            {questions.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="exam-questions-list">
          {questions.map((question, index) => (
            <article
              className="exam-question-card"
              key={question.id}
            >
              <div className="exam-question-top">
                <div>
                  <span className="exam-question-section">
                    {question.section}
                  </span>

                  <span className="exam-question-number">
                    Question {index + 1}
                  </span>
                </div>

                <div className="exam-question-actions">
                  <span className="exam-points">
                    {question.points} pts
                  </span>

                  <button
                    type="button"
                    className="delete-course-button"
                    onClick={() =>
                      handleDeleteQuestion(
                        question.id
                      )
                    }
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="exam-question-body">
                <h3>{question.question}</h3>

                <textarea
                  className="exam-answer-area"
                  placeholder="Réponse de l'étudiant..."
                  value={question.answer}
                  onChange={(event) =>
                    handleAnswerChange(
                      question.id,
                      event.target.value
                    )
                  }
                />
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="add-exam-question-button"
          onClick={handleAddQuestion}
        >
          + Ajouter une question
        </button>
      </section>

      {/* FOOTER */}

      <section className="generated-exam-footer">
        <button
          type="button"
          className="outline-button"
          onClick={() => navigate("/generator")}
        >
          ← Modifier les paramètres
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={handleValidateExam}
        >
          ✓ Valider l'examen
        </button>
      </section>
    </DashboardLayout>
  );
}

export default GeneratedExam;