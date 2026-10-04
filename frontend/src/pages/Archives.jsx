import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function Archives() {
  const navigate = useNavigate();

  const [filterSubject, setFilterSubject] = useState("all");
  const [filterPromotion, setFilterPromotion] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const [archives] = useState([
    {
      id: 1,
      title: "Introduction au Cloud Computing",
      type: "course",
      subject: "Cloud Computing",
      promotion: "Cycle ingénieur",
      createdAt: "04/10/2026",
    },
    {
      id: 2,
      title: "Architecture Cloud",
      type: "course",
      subject: "Cloud Computing",
      promotion: "Cycle ingénieur",
      createdAt: "03/10/2026",
    },
    {
      id: 3,
      title: "Examen Réseaux TCP/IP",
      type: "exam",
      subject: "Réseaux informatiques",
      promotion: "Cycle ingénieur",
      createdAt: "02/10/2026",
    },
  ]);

  const subjects = [
    "Cloud Computing",
    "Réseaux informatiques",
  ];

  const promotions = [
    "Cycle ingénieur",
  ];

  /*
    =====================================================
    FILTRAGE DES ARCHIVES
    =====================================================
  */

  const filteredArchives = archives.filter((archive) => {
    const subjectMatches =
      filterSubject === "all" ||
      archive.subject === filterSubject;

    const promotionMatches =
      filterPromotion === "all" ||
      archive.promotion === filterPromotion;

    const typeMatches =
      filterType === "all" ||
      archive.type === filterType;

    return (
      subjectMatches &&
      promotionMatches &&
      typeMatches
    );
  });

  /*
    =====================================================
    LABEL DU TYPE
    =====================================================
  */

  const getTypeLabel = (type) => {
    if (type === "exam") {
      return "Examen";
    }

    return "Cours";
  };

  /*
    =====================================================
    ICÔNE DU TYPE
    =====================================================
  */

  const getTypeIcon = (type) => {
    if (type === "exam") {
      return "📋";
    }

    return "📘";
  };

  /*
    =====================================================
    UTILISER UNE ARCHIVE
    =====================================================

    On envoie l'archive sélectionnée vers le Générateur.
  */

  const handleUseArchive = (archive) => {
    navigate("/generator", {
      state: {
        archive,
      },
    });
  };

  /*
    =====================================================
    AFFICHAGE
    =====================================================
  */

  return (
    <DashboardLayout activePage="archives">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="archives-header">

        <div>

          <span className="dashboard-eyebrow">
            ARCHIVES
          </span>

          <h1>
            Archives pédagogiques
          </h1>

          <p>
            Consultez les archives disponibles selon vos
            matières et vos promotions.
          </p>

        </div>

        <button
          type="button"
          className="archives-create-button"
          onClick={() => navigate("/generator")}
        >
          <span>✦</span>
          Générer un contenu
        </button>

      </section>


      {/* =====================================================
          FILTRES
      ===================================================== */}

      <section className="archives-filters">

        {/* MATIÈRE */}

        <div className="archives-filter-group">

          <label htmlFor="archive-subject">
            Matière
          </label>

          <select
            id="archive-subject"
            value={filterSubject}
            onChange={(event) =>
              setFilterSubject(event.target.value)
            }
          >

            <option value="all">
              Toutes les matières
            </option>

            {subjects.map((subject) => (
              <option
                key={subject}
                value={subject}
              >
                {subject}
              </option>
            ))}

          </select>

        </div>


        {/* PROMOTION */}

        <div className="archives-filter-group">

          <label htmlFor="archive-promotion">
            Promotion
          </label>

          <select
            id="archive-promotion"
            value={filterPromotion}
            onChange={(event) =>
              setFilterPromotion(event.target.value)
            }
          >

            <option value="all">
              Toutes les promotions
            </option>

            {promotions.map((promotion) => (
              <option
                key={promotion}
                value={promotion}
              >
                {promotion}
              </option>
            ))}

          </select>

        </div>


        {/* TYPE */}

        <div className="archives-filter-group">

          <label htmlFor="archive-type">
            Type
          </label>

          <select
            id="archive-type"
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

            <option value="exam">
              Examens
            </option>

          </select>

        </div>

      </section>


      {/* =====================================================
          LISTE DES ARCHIVES
      ===================================================== */}

      <section className="archives-list-section">

        <div className="archives-list-header">

          <div>

            <span className="archives-list-label">
              ARCHIVES DISPONIBLES
            </span>

            <h2>
              {filteredArchives.length} archive
              {filteredArchives.length !== 1
                ? "s"
                : ""}
            </h2>

          </div>

        </div>


        {/* ===================================================
            AUCUNE ARCHIVE
        =================================================== */}

        {filteredArchives.length === 0 ? (

          <div className="archives-empty">

            <div className="archives-empty-icon">
              ▧
            </div>

            <h3>
              Aucune archive trouvée
            </h3>

            <p>
              Aucune archive ne correspond aux filtres
              sélectionnés.
            </p>

          </div>

        ) : (

          /* =================================================
             ARCHIVES
          ================================================= */

          <div className="archives-grid">

            {filteredArchives.map((archive) => (

              <article
                className="archive-card"
                key={archive.id}
              >

                {/* TYPE */}

                <div className="archive-card-top">

                  <div className="archive-type">

                    <div className="archive-type-icon">
                      {getTypeIcon(archive.type)}
                    </div>

                    <span>
                      {getTypeLabel(archive.type)}
                    </span>

                  </div>

                </div>


                {/* TITRE */}

                <h3>
                  {archive.title}
                </h3>


                {/* MATIÈRE */}

                <p className="archive-subject">
                  {archive.subject}
                </p>


                {/* PROMOTION */}

                <div className="archive-details">

                  <div>

                    <span>
                      Promotion
                    </span>

                    <strong>
                      {archive.promotion}
                    </strong>

                  </div>

                </div>


                {/* FOOTER */}

                <div className="archive-card-footer">

                  <span className="archive-date">
                    {archive.createdAt}
                  </span>

                  <button
                    type="button"
                    className="archive-use-button"
                    onClick={() =>
                      handleUseArchive(archive)
                    }
                  >
                    Utiliser
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </DashboardLayout>
  );
}

export default Archives;