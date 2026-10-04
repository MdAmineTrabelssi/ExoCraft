import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function CourseResult() {
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    const savedCourse = sessionStorage.getItem(
      "exocraft_course_result"
    );

    if (savedCourse) {
      setCourse(JSON.parse(savedCourse));
    }
  }, []);

  if (!course) {
    return (
      <DashboardLayout activePage="generator">
        <section className="course-result-empty">
          <div className="course-result-empty-icon">
            📚
          </div>

          <h1>Aucun cours validé</h1>

          <p>
            Aucun cours n'a encore été validé.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/generator")}
          >
            Créer un cours
          </button>
        </section>
      </DashboardLayout>
    );
  }

  const totalSections = course.sections?.length || 0;

  const totalFiles =
    course.sections?.filter(
      (section) => section.file
    ).length || 0;

  return (
    <DashboardLayout activePage="generator">
      {/* HEADER */}

      <section className="course-result-header">
        <div>
          <span className="page-label">
            COURS VALIDÉ
          </span>

          <h1>
            Votre cours est prêt
          </h1>

          <p>
            Le cours a été validé avec succès.
            Vous pouvez maintenant le consulter
            ou retourner au générateur.
          </p>
        </div>
      </section>

      {/* CARTE PRINCIPALE */}

      <section className="course-result-main-card">
        <div className="course-result-icon">
          ✓
        </div>

        <span className="course-result-label">
          VALIDATION RÉUSSIE
        </span>

        <h2>
          {course.title}
        </h2>

        <p className="course-result-description">
          Votre contenu pédagogique a été validé
          et peut maintenant être utilisé.
        </p>

        {/* STATISTIQUES */}

        <div className="course-result-stats">

          <div className="course-result-stat">
            <div className="result-stat-icon purple">
              📚
            </div>

            <div>
              <strong>
                {totalSections}
              </strong>

              <span>
                {totalSections > 1
                  ? "Sections"
                  : "Section"}
              </span>
            </div>
          </div>

          <div className="course-result-stat">
            <div className="result-stat-icon green">
              📎
            </div>

            <div>
              <strong>
                {totalFiles}
              </strong>

              <span>
                {totalFiles > 1
                  ? "Fichiers joints"
                  : "Fichier joint"}
              </span>
            </div>
          </div>

          <div className="course-result-stat">
            <div className="result-stat-icon blue">
              ✓
            </div>

            <div>
              <strong>
                Validé
              </strong>

              <span>
                État du cours
              </span>
            </div>
          </div>

        </div>

        {/* BOUTONS */}

        <div className="course-result-actions">

          <button
            type="button"
            className="outline-button"
            onClick={() =>
              navigate("/generator")
            }
          >
            ← Retour au générateur
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              navigate("/generated-course")
            }
          >
            📖 Voir le cours
          </button>

        </div>
      </section>
    </DashboardLayout>
  );
}

export default CourseResult;