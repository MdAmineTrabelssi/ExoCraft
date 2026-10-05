import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

/* =========================================================
   QUESTIONS AWS
   ========================================================= */

const awsQuestions = [
  {
    question: "Qu'est-ce qu'AWS ?",
    options: [
      "Un système d'exploitation",
      "Une plateforme de services cloud",
      "Un langage de programmation",
      "Un antivirus",
    ],
    answer: 1,
    explanation:
      "AWS (Amazon Web Services) est une plateforme de services cloud.",
  },
  {
    question:
      "Quel service AWS permet de créer des machines virtuelles ?",
    options: [
      "Amazon S3",
      "Amazon EC2",
      "Amazon RDS",
      "Amazon IAM",
    ],
    answer: 1,
    explanation:
      "Amazon EC2 permet de créer et gérer des instances de machines virtuelles.",
  },
  {
    question:
      "Quel service AWS est principalement utilisé pour le stockage d'objets ?",
    options: [
      "Amazon S3",
      "Amazon EC2",
      "Amazon VPC",
      "Amazon IAM",
    ],
    answer: 0,
    explanation:
      "Amazon S3 est le service AWS de stockage d'objets.",
  },
  {
    question:
      "Quel service AWS permet de gérer les utilisateurs et les permissions ?",
    options: [
      "IAM",
      "EC2",
      "S3",
      "CloudFront",
    ],
    answer: 0,
    explanation:
      "AWS IAM permet de gérer les utilisateurs, groupes, rôles et permissions.",
  },
  {
    question: "Que signifie EC2 ?",
    options: [
      "Elastic Cloud Computing",
      "Elastic Compute Cloud",
      "Electronic Compute Center",
      "Enterprise Cloud Controller",
    ],
    answer: 1,
    explanation:
      "EC2 signifie Elastic Compute Cloud.",
  },
  {
    question:
      "Quel service AWS est utilisé pour les bases de données relationnelles ?",
    options: [
      "Amazon RDS",
      "Amazon S3",
      "Amazon EC2",
      "Amazon SNS",
    ],
    answer: 0,
    explanation:
      "Amazon RDS est un service managé pour les bases de données relationnelles.",
  },
  {
    question:
      "Quel service AWS permet de créer un réseau virtuel isolé ?",
    options: [
      "Amazon VPC",
      "Amazon S3",
      "AWS Lambda",
      "AWS IAM",
    ],
    answer: 0,
    explanation:
      "Amazon VPC permet de créer un réseau virtuel isolé.",
  },
  {
    question:
      "Quel service AWS permet d'exécuter du code sans gérer directement les serveurs ?",
    options: [
      "Amazon EC2",
      "AWS Lambda",
      "Amazon S3",
      "Amazon RDS",
    ],
    answer: 1,
    explanation:
      "AWS Lambda permet d'exécuter du code sans gérer directement les serveurs.",
  },
  {
    question:
      "Quel service AWS permet de distribuer du contenu avec un CDN ?",
    options: [
      "Amazon CloudFront",
      "AWS IAM",
      "Amazon RDS",
      "Amazon DynamoDB",
    ],
    answer: 0,
    explanation:
      "Amazon CloudFront est le service CDN d'AWS.",
  },
  {
    question:
      "Quel est l'un des principaux avantages du Cloud Computing ?",
    options: [
      "L'absence totale d'Internet",
      "La scalabilité",
      "L'obligation d'acheter des serveurs",
      "L'absence de sauvegarde",
    ],
    answer: 1,
    explanation:
      "La scalabilité permet d'adapter les ressources aux besoins.",
  },
];

/* =========================================================
   QUESTIONS CLOUD COMPUTING
   ========================================================= */

const cloudQuestions = [
  {
    question: "Qu'est-ce que le Cloud Computing ?",
    options: [
      "Un système d'exploitation",
      "L'accès à des ressources informatiques via Internet",
      "Un langage de programmation",
      "Un protocole réseau",
    ],
    answer: 1,
    explanation:
      "Le Cloud Computing permet d'accéder à des ressources informatiques via Internet.",
  },
  {
    question: "Que signifie IaaS ?",
    options: [
      "Internet as a Service",
      "Infrastructure as a Service",
      "Information as a System",
      "Interface as a Service",
    ],
    answer: 1,
    explanation:
      "IaaS signifie Infrastructure as a Service.",
  },
  {
    question: "Que signifie PaaS ?",
    options: [
      "Platform as a Service",
      "Program as a System",
      "Private as a Service",
      "Processing as a System",
    ],
    answer: 0,
    explanation:
      "PaaS signifie Platform as a Service.",
  },
  {
    question: "Que signifie SaaS ?",
    options: [
      "System as a Service",
      "Software as a Service",
      "Storage as a System",
      "Security as a System",
    ],
    answer: 1,
    explanation:
      "SaaS signifie Software as a Service.",
  },
  {
    question: "Quel cloud est accessible au grand public ?",
    options: [
      "Cloud privé",
      "Cloud public",
      "Cloud local",
      "Cloud isolé",
    ],
    answer: 1,
    explanation:
      "Un cloud public fournit des services accessibles à plusieurs clients.",
  },
  {
    question: "Quel est l'objectif de la scalabilité ?",
    options: [
      "Supprimer Internet",
      "Adapter les ressources aux besoins",
      "Supprimer les serveurs",
      "Bloquer les utilisateurs",
    ],
    answer: 1,
    explanation:
      "La scalabilité permet d'adapter les ressources selon la charge.",
  },
  {
    question:
      "Quel modèle fournit une plateforme pour développer des applications ?",
    options: [
      "IaaS",
      "PaaS",
      "SaaS",
      "DNS",
    ],
    answer: 1,
    explanation:
      "PaaS fournit une plateforme permettant de développer et déployer des applications.",
  },
  {
    question: "Quel est un exemple de fournisseur cloud ?",
    options: [
      "AWS",
      "HTML",
      "CSS",
      "Java",
    ],
    answer: 0,
    explanation:
      "AWS est un important fournisseur de services cloud.",
  },
  {
    question:
      "Quelle solution combine généralement cloud public et cloud privé ?",
    options: [
      "Cloud hybride",
      "Cloud local",
      "Cloud isolé",
      "Cloud personnel",
    ],
    answer: 0,
    explanation:
      "Le cloud hybride combine des environnements privés et publics.",
  },
  {
    question:
      "Pourquoi utilise-t-on la virtualisation dans le cloud ?",
    options: [
      "Pour supprimer Internet",
      "Pour utiliser efficacement les ressources physiques",
      "Pour empêcher la scalabilité",
      "Pour supprimer les machines virtuelles",
    ],
    answer: 1,
    explanation:
      "La virtualisation permet d'utiliser efficacement les ressources physiques.",
  },
];

/* =========================================================
   QUESTIONS PAR THÈME
   ========================================================= */

function getQuestionsForTheme(theme) {
  const value = String(theme || "").toLowerCase();

  if (value.includes("aws")) {
    return awsQuestions;
  }

  return cloudQuestions;
}

/* =========================================================
   NORMALISATION DES QUESTIONS
   ========================================================= */

function normalizeQuestions(questions) {
  if (!Array.isArray(questions)) {
    return [];
  }

  return questions.map((question, index) => ({
    id:
      question.id ||
      `${Date.now()}-${index}-${Math.random()}`,
    question:
      question.question ||
      question.enonce ||
      "",
    options:
      Array.isArray(question.options)
        ? [
            ...question.options,
            "",
            "",
            "",
          ].slice(0, 4)
        : [
            "Proposition A",
            "Proposition B",
            "Proposition C",
            "Proposition D",
          ],
    answer:
      typeof question.answer === "number"
        ? question.answer
        : 0,
    explanation:
      question.explanation ||
      "",
  }));
}

/* =========================================================
   COMPOSANT PRINCIPAL
   ========================================================= */

function GeneratedQuiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const locationData = location.state || {};

  /* =====================================================
     DONNÉES DE GÉNÉRATION
     ===================================================== */

  let generatorData = {};

  try {
    const savedGeneration =
      sessionStorage.getItem("exocraft_generation");

    if (savedGeneration) {
      generatorData = JSON.parse(savedGeneration);
    }
  } catch (error) {
    console.error(
      "Erreur lecture génération :",
      error
    );
  }

  /* =====================================================
     CONTENU SAUVEGARDÉ
     ===================================================== */

  let savedContent = null;

  try {
    const saved =
      localStorage.getItem("exocraft_contents");

    if (saved) {
      const contents = JSON.parse(saved);

      savedContent = contents.find(
        (content) => {
          if (content.type !== "quiz") {
            return false;
          }

          if (
            locationData.id &&
            content.id === locationData.id
          ) {
            return true;
          }

          if (
            locationData.title &&
            content.title === locationData.title
          ) {
            return true;
          }

          if (
            locationData.theme &&
            content.theme === locationData.theme
          ) {
            return true;
          }

          if (
            generatorData.theme &&
            content.theme === generatorData.theme
          ) {
            return true;
          }

          return false;
        }
      );
    }
  } catch (error) {
    console.error(
      "Erreur lecture contenus :",
      error
    );
  }

  /* =====================================================
     INFORMATIONS DU QUIZ
     ===================================================== */

  const title =
    locationData.title ||
    savedContent?.title ||
    generatorData.title ||
    locationData.theme ||
    generatorData.theme ||
    savedContent?.theme ||
    "aws";

  const theme =
    locationData.theme ||
    locationData.context ||
    savedContent?.theme ||
    generatorData.theme ||
    "aws";

  const difficulty =
    locationData.difficulty ||
    savedContent?.difficulty ||
    generatorData.difficulty ||
    "Moyenne";

  /* =====================================================
     QUESTIONS INITIALES
     ===================================================== */

  const getInitialQuestions = () => {
    /* 1. Questions envoyées par MyContent */

    if (
      Array.isArray(locationData.questions) &&
      locationData.questions.length > 0
    ) {
      return normalizeQuestions(
        locationData.questions
      );
    }

    /* 2. Questions sauvegardées */

    if (
      Array.isArray(savedContent?.questions) &&
      savedContent.questions.length > 0
    ) {
      return normalizeQuestions(
        savedContent.questions
      );
    }

    /* 3. Questions provenant de la génération */

    if (
      Array.isArray(generatorData.questions) &&
      generatorData.questions.length > 0
    ) {
      return normalizeQuestions(
        generatorData.questions
      );
    }

    /* 4. Questions adaptées au thème */

    return normalizeQuestions(
      getQuestionsForTheme(theme)
    );
  };

  const [questions, setQuestions] =
    useState(getInitialQuestions);

  const [isEditing, setIsEditing] =
    useState(false);

  const [userAnswers, setUserAnswers] =
    useState({});

  const [showCorrection, setShowCorrection] =
    useState(false);

  /* =====================================================
     SAUVEGARDE AUTOMATIQUE DES QUESTIONS
     ===================================================== */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          "exocraft_contents"
        );

      if (!saved) {
        return;
      }

      const contents = JSON.parse(saved);

      let found = false;

      const newContents = contents.map(
        (content) => {
          const sameQuiz =
            content.type === "quiz" &&
            (
              (
                locationData.id &&
                content.id === locationData.id
              ) ||
              (
                content.title === title &&
                content.theme === theme
              ) ||
              (
                generatorData.theme &&
                content.theme === generatorData.theme
              )
            );

          if (!sameQuiz) {
            return content;
          }

          found = true;

          return {
            ...content,
            title,
            theme,
            difficulty,
            questions,
            questionCount: questions.length,
          };
        }
      );

      if (found) {
        localStorage.setItem(
          "exocraft_contents",
          JSON.stringify(newContents)
        );
      }
    } catch (error) {
      console.error(
        "Erreur de sauvegarde automatique :",
        error
      );
    }
  }, [
    questions,
    title,
    theme,
    difficulty,
    locationData.id,
    generatorData.theme,
  ]);

  /* =====================================================
     MODIFIER LA QUESTION
     ===================================================== */

  const updateQuestion = (
    questionIndex,
    value
  ) => {
    setQuestions((previous) =>
      previous.map(
        (question, index) =>
          index === questionIndex
            ? {
                ...question,
                question: value,
              }
            : question
      )
    );
  };

  /* =====================================================
     MODIFIER UNE PROPOSITION
     ===================================================== */

  const updateOption = (
    questionIndex,
    optionIndex,
    value
  ) => {
    setQuestions((previous) =>
      previous.map(
        (question, index) => {
          if (index !== questionIndex) {
            return question;
          }

          const options = [
            ...question.options,
          ];

          options[optionIndex] = value;

          return {
            ...question,
            options,
          };
        }
      )
    );
  };

  /* =====================================================
     CHOISIR LA BONNE RÉPONSE EN MODE MODIFICATION
     ===================================================== */

  const updateCorrectAnswer = (
    questionIndex,
    optionIndex
  ) => {
    setQuestions((previous) =>
      previous.map(
        (question, index) =>
          index === questionIndex
            ? {
                ...question,
                answer: optionIndex,
              }
            : question
      )
    );
  };

  /* =====================================================
     AJOUTER UNE QUESTION
     ===================================================== */

  const addQuestion = () => {
    setQuestions((previous) => [
      ...previous,
      {
        id: `${Date.now()}-${Math.random()}`,
        question: "Nouvelle question",
        options: [
          "Proposition A",
          "Proposition B",
          "Proposition C",
          "Proposition D",
        ],
        answer: 0,
        explanation: "",
      },
    ]);
  };

  /* =====================================================
     SUPPRIMER UNE QUESTION
     ===================================================== */

  const deleteQuestion = (
    questionIndex
  ) => {
    if (questions.length <= 1) {
      alert(
        "Le quiz doit contenir au moins une question."
      );

      return;
    }

    setQuestions((previous) =>
      previous.filter(
        (_, index) =>
          index !== questionIndex
      )
    );
  };

  /* =====================================================
     CHOISIR UNE RÉPONSE
     ===================================================== */

  const selectAnswer = (
    questionIndex,
    optionIndex
  ) => {
    setUserAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));
  };

  /* =====================================================
     SAUVEGARDER LE QUIZ
     ===================================================== */

  const saveQuizToLocalStorage = (
    status = "draft"
  ) => {
    try {
      const saved =
        localStorage.getItem(
          "exocraft_contents"
        );

      const contents = saved
        ? JSON.parse(saved)
        : [];

      const quizId =
        locationData.id ||
        savedContent?.id ||
        generatorData.id ||
        `${Date.now()}`;

      let found = false;

      const newContents = contents.map(
        (content) => {
          const sameQuiz =
            content.type === "quiz" &&
            (
              content.id === quizId ||
              (
                content.title === title &&
                content.theme === theme
              )
            );

          if (!sameQuiz) {
            return content;
          }

          found = true;

          return {
            ...content,
            id: content.id || quizId,
            type: "quiz",
            title,
            subject:
              content.subject ||
              generatorData.subject ||
              "",
            theme,
            promotion:
              content.promotion ||
              generatorData.promotion ||
              "",
            difficulty,
            questions,
            questionCount: questions.length,
            status,
            visibility:
              content.visibility ||
              "private",
            variants:
              content.variants ||
              generatorData.variants ||
              1,
            useArchive:
              content.useArchive ||
              generatorData.useArchive ||
              false,
            archive:
              content.archive ||
              generatorData.archive ||
              null,
            createdAt:
              content.createdAt ||
              new Date().toISOString(),
          };
        }
      );

      /* Si le quiz n'existe pas encore,
         on le crée */

      if (!found) {
        newContents.unshift({
          id: quizId,
          type: "quiz",
          title,
          subject:
            generatorData.subject || "",
          theme,
          promotion:
            generatorData.promotion || "",
          difficulty,
          questions,
          questionCount: questions.length,
          status,
          visibility: "private",
          variants:
            generatorData.variants || 1,
          useArchive:
            generatorData.useArchive || false,
          archive:
            generatorData.archive || null,
          createdAt:
            new Date().toISOString(),
        });
      }

      localStorage.setItem(
        "exocraft_contents",
        JSON.stringify(newContents)
      );

      return true;
    } catch (error) {
      console.error(
        "Erreur sauvegarde quiz :",
        error
      );

      return false;
    }
  };

  /* =====================================================
     VALIDER LE QUIZ
     ===================================================== */

  const validateQuiz = () => {
    /* Vérifier les questions */

    for (
      let i = 0;
      i < questions.length;
      i++
    ) {
      const question = questions[i];

      if (
        !question.question ||
        !question.question.trim()
      ) {
        alert(
          `La question ${i + 1} est vide.`
        );

        return;
      }

      if (
        !Array.isArray(question.options) ||
        question.options.length !== 4
      ) {
        alert(
          `La question ${i + 1} doit avoir 4 propositions.`
        );

        return;
      }

      for (
        let j = 0;
        j < question.options.length;
        j++
      ) {
        if (
          !question.options[j] ||
          !question.options[j].trim()
        ) {
          alert(
            `La proposition ${j + 1} de la question ${i + 1} est vide.`
          );

          return;
        }
      }

      if (
        typeof question.answer !== "number" ||
        question.answer < 0 ||
        question.answer > 3
      ) {
        alert(
          `Sélectionne une bonne réponse pour la question ${i + 1}.`
        );

        return;
      }
    }

    /* Sauvegarder comme validé */

    saveQuizToLocalStorage("valid");

    /* =================================================
       CALCUL DU SCORE
       ================================================= */

    let correct = 0;

    questions.forEach(
      (question, index) => {
        if (
          userAnswers[index] ===
          question.answer
        ) {
          correct++;
        }
      }
    );

    const total = questions.length;

    const score =
      total > 0
        ? Math.round(
            (correct / total) * 100
          )
        : 0;

    /* =================================================
       SAUVEGARDER LE RÉSULTAT
       ================================================= */

    const result = {
      quizTitle: title,
      theme,
      difficulty,
      generationType: "QCM",
      score,
      correct,
      total,
      questions,
      answers: userAnswers,
      date: new Date().toISOString(),
    };

    sessionStorage.setItem(
      "exocraft_quiz_result",
      JSON.stringify(result)
    );

    navigate("/quiz-result");
  };

  /* =====================================================
     RETOUR
     ===================================================== */

  const goBack = () => {
    navigate("/my-content");
  };

  /* =====================================================
     AFFICHAGE
     ===================================================== */

  return (
    <DashboardLayout activePage="contents">
      <div className="quiz-editor">
        {/* HEADER */}

        <div className="quiz-editor-header">
          <div>
            <button
              type="button"
              onClick={goBack}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#667085",
                fontSize: "15px",
                padding: 0,
                marginBottom: "16px",
              }}
            >
              ← Retour à mes contenus
            </button>

            <h1
              style={{
                margin: 0,
                fontSize: "32px",
                color: "#101828",
              }}
            >
              {title}
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "#667085",
                fontSize: "16px",
              }}
            >
              Quiz • {theme}
            </p>
          </div>

          <div className="quiz-editor-controls">
            <button
              type="button"
              onClick={() =>
                setIsEditing(!isEditing)
              }
              style={{
                padding: "11px 18px",
                border:
                  "1px solid #d0d5dd",
                borderRadius: "10px",
                background: "#ffffff",
                color: "#344054",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {isEditing
                ? "Terminer"
                : "Modifier"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={addQuestion}
                style={{
                  padding: "11px 18px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#6941c6",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                + Ajouter
              </button>
            )}
          </div>
        </div>

        {/* INFORMATIONS */}

        <div className="quiz-editor-info">
          <InfoCard
            title="Questions"
            value={questions.length}
          />

          <InfoCard
            title="Difficulté"
            value={difficulty}
          />

          <InfoCard
            title="Type"
            value="QCM"
          />

          <InfoCard
            title="Thème"
            value={theme}
          />
        </div>

        {/* QUESTIONS */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {questions.map(
            (
              question,
              questionIndex
            ) => (
              <QuestionCard
                key={question.id}
                question={question}
                questionIndex={questionIndex}
                isEditing={isEditing}
                userAnswer={
                  userAnswers[questionIndex]
                }
                showCorrection={
                  showCorrection
                }
                updateQuestion={
                  updateQuestion
                }
                updateOption={
                  updateOption
                }
                updateCorrectAnswer={
                  updateCorrectAnswer
                }
                selectAnswer={
                  selectAnswer
                }
                deleteQuestion={
                  deleteQuestion
                }
              />
            )
          )}
        </div>

        {/* ACTIONS */}

        <div className="quiz-editor-actions">
          <button
            type="button"
            onClick={() =>
              setShowCorrection(
                !showCorrection
              )
            }
            style={{
              padding: "11px 18px",
              border:
                "1px solid #d0d5dd",
              borderRadius: "10px",
              background: "#ffffff",
              color: "#344054",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {showCorrection
              ? "Masquer les corrections"
              : "Afficher les corrections"}
          </button>

          <button
            type="button"
            onClick={validateQuiz}
            style={{
              padding: "13px 24px",
              border: "none",
              borderRadius: "10px",
              background: "#6941c6",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            Valider le quiz →
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* =========================================================
   INFO CARD
   ========================================================= */

function InfoCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border:
          "1px solid #eaecf0",
        borderRadius: "14px",
        padding: "18px",
      }}
    >
      <div
        style={{
          color: "#667085",
          fontSize: "13px",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#101828",
          fontSize: "18px",
          fontWeight: 700,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   QUESTION CARD
   ========================================================= */

function QuestionCard({
  question,
  questionIndex,
  isEditing,
  userAnswer,
  showCorrection,
  updateQuestion,
  updateOption,
  updateCorrectAnswer,
  selectAnswer,
  deleteQuestion,
}) {
  return (
    <div className="quiz-editor-question">
      {/* QUESTION */}

      <div className="quiz-editor-question-header">
        <div
          style={{
            display: "flex",
            gap: "12px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              minWidth: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#f4ebff",
              color: "#6941c6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            {questionIndex + 1}
          </div>

          {isEditing ? (
            <textarea
              aria-label={`Question ${questionIndex + 1}`}
              value={question.question}
              onChange={(event) =>
                updateQuestion(
                  questionIndex,
                  event.target.value
                )
              }
              style={{
                width: "100%",
                minHeight: "70px",
                padding: "12px",
                border:
                  "1px solid #d0d5dd",
                borderRadius: "10px",
                resize: "vertical",
                fontFamily: "inherit",
                fontSize: "15px",
              }}
            />
          ) : (
            <h3
              style={{
                margin: "5px 0 0",
                color: "#101828",
                fontSize: "17px",
                lineHeight: 1.5,
              }}
            >
              {question.question}
            </h3>
          )}
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={() =>
              deleteQuestion(questionIndex)
            }
            style={{
              marginLeft: "12px",
              padding: "8px 12px",
              border: "none",
              borderRadius: "8px",
              background: "#fef3f2",
              color: "#d92d20",
              cursor: "pointer",
            }}
          >
            Supprimer
          </button>
        )}
      </div>

      {/* REPONSES */}

      <div className="quiz-editor-options">
        {question.options.map(
          (option, optionIndex) => {
            const isCorrect =
              question.answer ===
              optionIndex;

            const isSelected =
              userAnswer ===
              optionIndex;

            return (
              <label
                key={optionIndex}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "15px",
                  border:
                    isEditing && isCorrect
                      ? "2px solid #6941c6"
                      : !isEditing &&
                        isSelected
                      ? "2px solid #6941c6"
                      : isCorrect &&
                        showCorrection
                      ? "2px solid #12b76a"
                      : "1px solid #eaecf0",
                  borderRadius: "10px",
                  background:
                    isCorrect &&
                    showCorrection
                      ? "#ecfdf3"
                      : isSelected
                      ? "#f9f5ff"
                      : "#ffffff",
                  cursor: "pointer",
                  transition:
                    "all 0.2s ease",
                }}
              >
                <input
                  type="radio"
                  aria-label={`Réponse ${optionIndex + 1} : ${option}`}
                  name={`question-${questionIndex}`}
                  checked={
                    isEditing
                      ? isCorrect
                      : isSelected
                  }
                  onChange={() => {
                    if (isEditing) {
                      updateCorrectAnswer(
                        questionIndex,
                        optionIndex
                      );
                    } else {
                      selectAnswer(
                        questionIndex,
                        optionIndex
                      );
                    }
                  }}
                  style={{
                    width: "18px",
                    height: "18px",
                    accentColor: "#6941c6",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />

                {isEditing ? (
                  <input
                    type="text"
                    aria-label={`Proposition ${optionIndex + 1} de la question ${questionIndex + 1}`}
                    value={option}
                    onChange={(event) =>
                      updateOption(
                        questionIndex,
                        optionIndex,
                        event.target.value
                      )
                    }
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                    style={{
                      flex: 1,
                      border: "none",
                      minWidth: 0,
                      background:
                        "transparent",
                      fontSize: "14px",
                      color: "#344054",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      color: "#344054",
                      fontSize: "14px",
                      lineHeight: 1.4,
                      userSelect: "none",
                    }}
                  >
                    {option}
                  </span>
                )}
              </label>
            );
          }
        )}
      </div>

      {/* CORRECTION */}

      {showCorrection && (
        <div
          className="quiz-editor-correction"
          style={{
            marginTop: "18px",
            padding: "14px 16px",
            borderRadius: "10px",
            background: "#ecfdf3",
            color: "#027a48",
            fontSize: "14px",
          }}
        >
          <strong>
            Bonne réponse :
          </strong>{" "}
          {
            question.options[
              question.answer
            ]
          }

          {question.explanation && (
            <div
              style={{
                marginTop: "6px",
              }}
            >
              {question.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GeneratedQuiz;