import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function QuizResult() {
  const navigate = useNavigate();

  /*
  =====================================================
  RÉCUPÉRER LE RÉSULTAT DU QUIZ
  =====================================================
  */

  const savedResult = sessionStorage.getItem(
    "exocraft_quiz_result"
  );


  /*
  =====================================================
  AUCUN RÉSULTAT
  =====================================================
  */

  if (!savedResult) {
    return (
      <DashboardLayout activePage="history">

        <div className="quiz-result-empty">

          <div className="quiz-result-empty-icon">
            !
          </div>

          <h1>
            Aucun résultat disponible
          </h1>

          <p>
            Aucun résultat de quiz n'a été trouvé.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              navigate("/generator")
            }
          >
            Créer un quiz
          </button>

        </div>

      </DashboardLayout>
    );
  }


  /*
  =====================================================
  CONVERTIR LES DONNÉES JSON
  =====================================================
  */

  let result;

  try {
    result = JSON.parse(savedResult);
  } catch (error) {

    console.error(
      "Erreur lors de la lecture du résultat :",
      error
    );

    return (
      <DashboardLayout activePage="history">

        <div className="quiz-result-empty">

          <div className="quiz-result-empty-icon">
            !
          </div>

          <h1>
            Résultat invalide
          </h1>

          <p>
            Impossible de lire les données
            du résultat.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              navigate("/generator")
            }
          >
            Créer un quiz
          </button>

        </div>

      </DashboardLayout>
    );
  }


  /*
  =====================================================
  DONNÉES DU RÉSULTAT
  =====================================================
  */

  const score =
    Number(result.score) || 0;


  const total =
    Number(result.total) || 0;


  const percentage =
    total > 0
      ? Math.round(
          (score / total) * 100
        )
      : 0;


  const wrongAnswers =
    Math.max(
      total - score,
      0
    );


  /*
  =====================================================
  INFORMATIONS DU QUIZ
  =====================================================
  */

  const quizTitle =
    result.quizTitle ||
    result.title ||
    result.theme ||
    "Évaluation";


  const theme =
    result.theme ||
    quizTitle;


  const difficulty =
    result.difficulty ||
    "Moyenne";


  const generationType =
    result.generationType ||
    "QCM";


  const questions =
    Array.isArray(result.questions)
      ? result.questions
      : [];


  const answers =
    result.answers || {};


  /*
  =====================================================
  MESSAGE SELON LE SCORE
  =====================================================
  */

  const getResultMessage = () => {

    if (percentage >= 80) {
      return "Excellent travail !";
    }

    if (percentage >= 60) {
      return "Bon travail !";
    }

    return "Continuez vos efforts !";
  };


  /*
  =====================================================
  COULEUR / ÉTAT DU SCORE
  =====================================================
  */

  const getScoreClass = () => {

    if (percentage >= 80) {
      return "excellent";
    }

    if (percentage >= 60) {
      return "good";
    }

    return "low";
  };


  /*
  =====================================================
  REFAIRE UN QUIZ
  =====================================================
  */

  const handleRetry = () => {

    sessionStorage.removeItem(
      "exocraft_quiz_result"
    );

    navigate("/generator");
  };


  /*
  =====================================================
  AFFICHAGE
  =====================================================
  */

  return (
    <DashboardLayout activePage="history">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="quiz-result-header">

        <div>

          <span className="page-label">
            RÉSULTAT DE L'ÉVALUATION
          </span>


          <h1>
            {quizTitle}
          </h1>


          <p>
            Voici le résultat de votre
            évaluation.
          </p>

        </div>


        <button
          type="button"
          className="outline-button"
          onClick={() =>
            navigate("/my-quizzes")
          }
        >
          ← Mes quiz
        </button>

      </section>


      {/* =================================================
          INFORMATIONS DU QUIZ
      ================================================= */}

      <section className="quiz-result-info">

        <div className="quiz-result-info-item">

          <span>
            THÈME
          </span>

          <strong>
            {theme}
          </strong>

        </div>


        <div className="quiz-result-info-item">

          <span>
            TYPE
          </span>

          <strong>
            {generationType}
          </strong>

        </div>


        <div className="quiz-result-info-item">

          <span>
            DIFFICULTÉ
          </span>

          <strong>
            {difficulty}
          </strong>

        </div>


        <div className="quiz-result-info-item">

          <span>
            QUESTIONS
          </span>

          <strong>
            {total}
          </strong>

        </div>

      </section>


      {/* =================================================
          SCORE PRINCIPAL
      ================================================= */}

      <section
        className={`quiz-result-main-card ${getScoreClass()}`}
      >

        <div className="quiz-result-icon">
          ✓
        </div>


        <span className="quiz-result-label">
          ÉVALUATION TERMINÉE
        </span>


        <h2>
          {getResultMessage()}
        </h2>


        <div className="quiz-score">

          <strong>
            {score}
          </strong>

          <span>
            / {total}
          </span>

        </div>


        <div className="quiz-score-percentage">
          {percentage}%
        </div>


        <p>

          Vous avez obtenu{" "}

          <strong>
            {score}
          </strong>{" "}

          bonne
          {score > 1 ? "s" : ""} réponse
          {score > 1 ? "s" : ""} sur{" "}

          <strong>
            {total}
          </strong>.

        </p>

      </section>


      {/* =================================================
          STATISTIQUES
      ================================================= */}

      <section className="quiz-result-stats">

        {/* BONNES RÉPONSES */}

        <div className="quiz-result-stat">

          <div className="result-stat-icon green">
            ✓
          </div>

          <div>

            <span>
              Bonnes réponses
            </span>

            <strong>
              {score}
            </strong>

          </div>

        </div>


        {/* MAUVAISES RÉPONSES */}

        <div className="quiz-result-stat">

          <div className="result-stat-icon red">
            ×
          </div>

          <div>

            <span>
              Mauvaises réponses
            </span>

            <strong>
              {wrongAnswers}
            </strong>

          </div>

        </div>


        {/* POURCENTAGE */}

        <div className="quiz-result-stat">

          <div className="result-stat-icon purple">
            %
          </div>

          <div>

            <span>
              Score
            </span>

            <strong>
              {percentage}%
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          DÉTAIL DES QUESTIONS
      ================================================= */}

      {questions.length > 0 && (

        <section className="quiz-result-questions">

          <div className="quiz-result-section-header">

            <div>

              <h2>
                Correction de l'évaluation
              </h2>

              <p>
                Consultez vos réponses et
                les bonnes réponses.
              </p>

            </div>

          </div>


          <div className="quiz-result-question-list">

            {questions.map(
              (question, index) => {

                const userAnswer =
                  answers[
                    question.id
                  ];


                const correctAnswer =
                  question.answer;


                const isCorrect =
                  userAnswer ===
                  correctAnswer;


                return (

                  <article
                    key={question.id}
                    className={
                      isCorrect
                        ? "result-question-card correct"
                        : "result-question-card incorrect"
                    }
                  >

                    {/* NUMÉRO */}

                    <div className="result-question-number">

                      {index + 1}

                    </div>


                    <div className="result-question-content">

                      {/* QUESTION */}

                      <div className="result-question-header">

                        <h3>
                          {question.question}
                        </h3>


                        <span
                          className={
                            isCorrect
                              ? "result-status correct"
                              : "result-status incorrect"
                          }
                        >

                          {isCorrect
                            ? "Correcte"
                            : "Incorrecte"}

                        </span>

                      </div>


                      {/* PROPOSITIONS */}

                      <div className="result-options">

                        {Array.isArray(
                          question.options
                        ) &&
                          question.options.map(
                            (
                              option,
                              optionIndex
                            ) => {

                              const isUserAnswer =
                                userAnswer ===
                                optionIndex;


                              const isCorrectAnswer =
                                correctAnswer ===
                                optionIndex;


                              let optionClass =
                                "result-option";


                              if (
                                isCorrectAnswer
                              ) {

                                optionClass +=
                                  " correct-answer";
                              }


                              if (
                                isUserAnswer &&
                                !isCorrectAnswer
                              ) {

                                optionClass +=
                                  " wrong-answer";
                              }


                              return (

                                <div
                                  key={
                                    optionIndex
                                  }
                                  className={
                                    optionClass
                                  }
                                >

                                  <span className="result-option-letter">

                                    {String.fromCharCode(
                                      65 +
                                        optionIndex
                                    )}

                                    .

                                  </span>


                                  <span className="result-option-text">

                                    {option}

                                  </span>


                                  {isCorrectAnswer && (

                                    <span className="result-option-label correct">

                                      ✓ Bonne réponse

                                    </span>

                                  )}


                                  {isUserAnswer &&
                                    !isCorrectAnswer && (

                                      <span className="result-option-label wrong">

                                        ✕

                                        Votre réponse

                                      </span>

                                    )}

                                </div>

                              );
                            }
                          )}

                      </div>

                    </div>

                  </article>

                );
              }
            )}

          </div>

        </section>

      )}


      {/* =================================================
          ACTIONS
      ================================================= */}

      <section className="quiz-result-actions">

        <button
          type="button"
          className="outline-button"
          onClick={
            handleRetry
          }
        >
          ↻ Refaire un quiz
        </button>


        <button
          type="button"
          className="primary-button"
          onClick={() =>
            navigate("/my-quizzes")
          }
        >
          Voir mes quiz →
        </button>

      </section>

    </DashboardLayout>
  );
}


export default QuizResult;