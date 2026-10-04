import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function GeneratedCourse() {
  const navigate = useNavigate();

  /* =========================================================
     SECTIONS DU COURS
  ========================================================= */

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Introduction au Cloud Computing",
      content:
        "Le Cloud Computing désigne l'utilisation de ressources informatiques accessibles à distance via Internet. Ces ressources peuvent inclure des serveurs, du stockage, des bases de données et des applications.",
    },

    {
      id: 2,
      title: "Les modèles de services Cloud",
      content:
        "Les principaux modèles de services Cloud sont IaaS, PaaS et SaaS. IaaS fournit une infrastructure informatique, PaaS fournit une plateforme de développement et SaaS fournit des applications accessibles directement aux utilisateurs.",
    },

    {
      id: 3,
      title: "Les modèles de déploiement",
      content:
        "Le Cloud peut être déployé sous différentes formes : Cloud public, Cloud privé ou Cloud hybride. Chaque modèle répond à des besoins différents en matière de sécurité, de contrôle et de flexibilité.",
    },
  ]);

  /* =========================================================
     ÉTATS
  ========================================================= */

  const [editingId, setEditingId] = useState(null);

  const [courseTitle, setCourseTitle] = useState(
    "Introduction au Cloud Computing"
  );

  /* =========================================================
     MODIFIER LE TITRE DU COURS
  ========================================================= */

  const handleTitleChange = (value) => {
    setCourseTitle(value);
  };

  /* =========================================================
     MODIFIER LE TITRE D'UNE SECTION
  ========================================================= */

  const handleSectionTitleChange = (id, value) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === id
          ? {
              ...section,
              title: value,
            }
          : section
      )
    );
  };

  /* =========================================================
     MODIFIER LE CONTENU D'UNE SECTION
  ========================================================= */

  const handleSectionContentChange = (id, value) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === id
          ? {
              ...section,
              content: value,
            }
          : section
      )
    );
  };

  /* =========================================================
     SUPPRIMER UNE SECTION
  ========================================================= */

  const handleDeleteSection = (id) => {
    if (sections.length <= 1) {
      alert(
        "Votre cours doit contenir au moins une section."
      );
      return;
    }

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette section ?"
    );

    if (!confirmed) {
      return;
    }

    setSections((currentSections) =>
      currentSections.filter(
        (section) => section.id !== id
      )
    );

    if (editingId === id) {
      setEditingId(null);
    }
  };

  /* =========================================================
     AJOUTER UNE SECTION
  ========================================================= */

  const handleAddSection = () => {
    const newSection = {
      id: Date.now(),
      title: "Nouvelle section",
      content:
        "Ajoutez ici le contenu de cette nouvelle section.",
    };

    setSections((currentSections) => [
      ...currentSections,
      newSection,
    ]);

    setEditingId(newSection.id);
  };

  /* =========================================================
     EXPORT
     
     BF-11 sera connecté au backend plus tard.
  ========================================================= */

  const handleExport = () => {
    alert(
      "L'export PDF / Word sera disponible avec le backend."
    );
  };

  /* =========================================================
     VALIDATION DU COURS
     
     BF-07 :
     L'enseignant vérifie et modifie le contenu
     avant de le valider.
  ========================================================= */

  const handleValidateCourse = () => {
    if (!courseTitle.trim()) {
      alert(
        "Veuillez renseigner le titre du cours."
      );
      return;
    }

    if (sections.length === 0) {
      alert(
        "Votre cours doit contenir au moins une section."
      );
      return;
    }

    const invalidSection = sections.find(
      (section) =>
        !section.title.trim() ||
        !section.content.trim()
    );

    if (invalidSection) {
      alert(
        "Veuillez compléter le titre et le contenu de toutes les sections."
      );
      return;
    }

    const courseResult = {
      title: courseTitle.trim(),
      sections: sections,
      status: "valid",
    };

    /* Sauvegarde du résultat */

    sessionStorage.setItem(
      "exocraft_course_result",
      JSON.stringify(courseResult)
    );

    /* Mise à jour du contenu dans MyContent */

    const savedContents =
      localStorage.getItem(
        "exocraft_contents"
      );

    if (savedContents) {
      try {
        const contents =
          JSON.parse(savedContents);

        const updatedContents =
          contents.map((content) => {
            if (
              content.type === "course" &&
              content.title ===
                "Introduction au Cloud Computing"
            ) {
              return {
                ...content,
                title: courseTitle.trim(),
                status: "valid",
              };
            }

            return content;
          });

        localStorage.setItem(
          "exocraft_contents",
          JSON.stringify(updatedContents)
        );
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour du contenu :",
          error
        );
      }
    }

    navigate("/course-result");
  };

  /* =========================================================
     AFFICHAGE
  ========================================================= */

  return (
    <DashboardLayout activePage="generator">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="generated-course-header">

        <div>

          <span className="page-label">
            COURS GÉNÉRÉ PAR L'IA
          </span>

          <h1>
            {courseTitle}
          </h1>

          <p>
            Vérifiez et personnalisez le contenu de votre
            cours avant de l'utiliser.
          </p>

        </div>


        <div className="generated-course-actions">

          <button
            type="button"
            className="outline-button"
            onClick={() =>
              navigate("/generator")
            }
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


      {/* =====================================================
          INFORMATIONS
      ===================================================== */}

      <section className="generated-course-info-grid">

        <div className="generated-course-info-card">

          <span>
            TYPE
          </span>

          <strong>
            Cours
          </strong>

        </div>


        <div className="generated-course-info-card">

          <span>
            SECTIONS
          </span>

          <strong>
            {sections.length}
          </strong>

        </div>


        <div className="generated-course-info-card">

          <span>
            LONGUEUR
          </span>

          <strong>
            Moyenne
          </strong>

        </div>


        <div className="generated-course-info-card">

          <span>
            SOURCE
          </span>

          <strong>
            Génération IA
          </strong>

        </div>

      </section>


      {/* =====================================================
          TITRE DU COURS
      ===================================================== */}

      <section className="generated-course-title-card">

        <div className="course-card-heading">

          <div className="course-heading-icon">
            T
          </div>

          <div>

            <h2>
              Titre du cours
            </h2>

            <p>
              Personnalisez le titre de votre contenu.
            </p>

          </div>

        </div>


        <input
          type="text"
          value={courseTitle}
          onChange={(event) =>
            handleTitleChange(
              event.target.value
            )
          }
          className="course-title-input"
        />

      </section>


      {/* =====================================================
          CONTENU DU COURS
      ===================================================== */}

      <section className="generated-course-sections">

        <div className="generated-course-section-header">

          <div>

            <h2>
              Contenu du cours
            </h2>

            <p>
              Modifiez, supprimez ou ajoutez des sections
              selon vos besoins.
            </p>

          </div>


          <span className="course-section-count">
            {sections.length} section
            {sections.length > 1 ? "s" : ""}
          </span>

        </div>


        <div className="course-sections-list">

          {sections.map((section, index) => (

            <article
              className="course-section-card"
              key={section.id}
            >

              {/* NUMÉRO */}

              <div className="course-section-number">
                {String(index + 1).padStart(2, "0")}
              </div>


              <div className="course-section-content">

                {/* HEADER */}

                <div className="course-section-top">

                  <span className="course-section-label">
                    SECTION {index + 1}
                  </span>


                  <div className="course-section-actions">

                    <button
                      type="button"
                      className="edit-course-button"
                      onClick={() =>
                        setEditingId(
                          editingId === section.id
                            ? null
                            : section.id
                        )
                      }
                    >
                      {editingId === section.id
                        ? "Terminer"
                        : "Modifier"}
                    </button>


                    <button
                      type="button"
                      className="delete-course-button"
                      onClick={() =>
                        handleDeleteSection(
                          section.id
                        )
                      }
                    >
                      Supprimer
                    </button>

                  </div>

                </div>


                {/* =================================================
                    MODE ÉDITION
                ================================================= */}

                {editingId === section.id ? (

                  <div className="course-edit-form">

                    {/* TITRE */}

                    <label>
                      Titre de la section
                    </label>

                    <input
                      type="text"
                      value={section.title}
                      onChange={(event) =>
                        handleSectionTitleChange(
                          section.id,
                          event.target.value
                        )
                      }
                    />


                    {/* CONTENU */}

                    <label>
                      Contenu
                    </label>

                    <textarea
                      rows="7"
                      value={section.content}
                      onChange={(event) =>
                        handleSectionContentChange(
                          section.id,
                          event.target.value
                        )
                      }
                    />

                  </div>

                ) : (

                  /* =================================================
                     MODE AFFICHAGE
                  ================================================= */

                  <div className="course-section-display">

                    <h3>
                      {section.title}
                    </h3>

                    <p>
                      {section.content}
                    </p>

                  </div>

                )}

              </div>

            </article>

          ))}

        </div>


        {/* =====================================================
            AJOUTER UNE SECTION
        ===================================================== */}

        <button
          type="button"
          className="add-course-section-button"
          onClick={handleAddSection}
        >
          + Ajouter une section
        </button>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <section className="generated-course-footer">

        <button
          type="button"
          className="outline-button"
          onClick={() =>
            navigate("/generator")
          }
        >
          ← Modifier les paramètres
        </button>


        <button
          type="button"
          className="primary-button"
          onClick={handleValidateCourse}
        >
          ✓ Valider le cours
        </button>

      </section>

    </DashboardLayout>
  );
}

export default GeneratedCourse;