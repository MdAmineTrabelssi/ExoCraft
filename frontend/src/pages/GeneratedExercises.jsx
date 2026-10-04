import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function GeneratedExercises() {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const [exercises] = useState([
    {
      id: 1,
      title: "Exercice 1 — Adressage IPv4",
      statement:
        "On dispose du réseau 192.168.10.0/24. Déterminez le masque, le nombre d'adresses disponibles et les plages d'adresses pour deux sous-réseaux.",
      correction:
        "Le masque /24 correspond à 255.255.255.0. Le réseau peut être subdivisé en plusieurs sous-réseaux selon le besoin.",
    },
    {
      id: 2,
      title: "Exercice 2 — Sous-réseaux",
      statement:
        "Une entreprise souhaite créer 4 sous-réseaux à partir du réseau 192.168.1.0/24. Déterminez le nouveau préfixe et le nombre d'adresses disponibles par sous-réseau.",
      correction:
        "Pour obtenir 4 sous-réseaux, on emprunte 2 bits. Le nouveau préfixe est /26.",
    },
    {
      id: 3,
      title: "Exercice 3 — Configuration réseau",
      statement:
        "Expliquez le rôle de l'adresse IP, du masque de sous-réseau, de la passerelle par défaut et du serveur DNS.",
      correction:
        "L'adresse IP identifie l'hôte, le masque détermine le réseau, la passerelle permet la communication avec d'autres réseaux et le DNS traduit les noms de domaine en adresses IP.",
    },
  ]);

  const handleValidate = () => {
    setValidated(true);
  };

  return (
    <DashboardLayout activePage="generator">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="generated-header">

        <div>

          <span className="dashboard-eyebrow">
            SÉRIE D'EXERCICES
          </span>

          <h1>
            Série d'exercices générée
          </h1>

          <p>
            Consultez, modifiez et validez votre série
            d'exercices.
          </p>

        </div>

        <button
          type="button"
          className="generated-back-button"
          onClick={() => navigate("/generator")}
        >
          ← Retour au générateur
        </button>

      </section>


      {/* =====================================================
          INFORMATIONS
      ===================================================== */}

      <section className="generated-info-card">

        <div>
          <span>
            Matière
          </span>

          <strong>
            Réseaux informatiques
          </strong>
        </div>

        <div>
          <span>
            Thème
          </span>

          <strong>
            Adressage IP
          </strong>
        </div>

        <div>
          <span>
            Nombre d'exercices
          </span>

          <strong>
            {exercises.length}
          </strong>
        </div>

        <div>
          <span>
            Statut
          </span>

          <strong
            className={
              validated
                ? "generated-valid-status"
                : "generated-draft-status"
            }
          >
            {validated
              ? "Validé"
              : "Brouillon"}
          </strong>
        </div>

      </section>


      {/* =====================================================
          EXERCISES
      ===================================================== */}

      <section className="generated-exercises-section">

        <div className="generated-section-heading">

          <div>

            <span className="generated-section-label">
              CONTENU
            </span>

            <h2>
              Exercices
            </h2>

          </div>

        </div>


        <div className="generated-exercises-list">

          {exercises.map((exercise, index) => (

            <article
              className="generated-exercise-card"
              key={exercise.id}
            >

              <div className="generated-exercise-number">
                {index + 1}
              </div>

              <div className="generated-exercise-content">

                <h3>
                  {exercise.title}
                </h3>

                <div className="generated-exercise-block">

                  <span>
                    Énoncé
                  </span>

                  <p>
                    {exercise.statement}
                  </p>

                </div>

                <div className="generated-correction-block">

                  <span>
                    Correction
                  </span>

                  <p>
                    {exercise.correction}
                  </p>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <section className="generated-actions">

        {validated && (
          <div className="generated-success-message">
            ✓ Série d'exercices validée avec succès.
          </div>
        )}

        <div className="generated-actions-buttons">

          <button
            type="button"
            className="generated-secondary-button"
            onClick={() => navigate("/generator")}
          >
            Modifier
          </button>

          <button
            type="button"
            className="generated-primary-button"
            onClick={handleValidate}
            disabled={validated}
          >
            {validated
              ? "Série validée"
              : "Valider la série"}
          </button>

        </div>

      </section>

    </DashboardLayout>
  );
}

export default GeneratedExercises;