import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function Documents() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Architecture Cloud.pdf",
      type: "PDF",
      size: "2.4 MB",
      date: "30 septembre 2026",
    },
    {
      id: 2,
      name: "Introduction AWS.pdf",
      type: "PDF",
      size: "1.8 MB",
      date: "28 septembre 2026",
    },
  ]);

  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileImport = (event) => {
    const files = Array.from(event.target.files);

    const newDocuments = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: file.name.split(".").pop()?.toUpperCase() || "FILE",
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: "Aujourd'hui",
    }));

    setDocuments((current) => [
      ...current,
      ...newDocuments,
    ]);

    event.target.value = "";
  };

  const toggleDocument = (id) => {
    setSelectedDocuments((current) => {
      if (current.includes(id)) {
        return current.filter(
          (documentId) => documentId !== id
        );
      }

      return [...current, id];
    });
  };

  const deleteDocument = (id) => {
    setDocuments((current) =>
      current.filter((document) => document.id !== id)
    );

    setSelectedDocuments((current) =>
      current.filter((documentId) => documentId !== id)
    );
  };

  const generateFromDocuments = () => {
    if (selectedDocuments.length === 0) {
      return;
    }

    navigate("/generator");
  };

  return (
    <DashboardLayout activePage="documents">

      {/* =========================
          HEADER
      ========================= */}

      <div className="documents-header">

        <div>

          <span className="page-eyebrow">
            BIBLIOTHÈQUE
          </span>

          <h1>
            Mes documents
          </h1>

          <p>
            Importez et sélectionnez vos documents pédagogiques
            comme sources pour générer vos évaluations.
          </p>

        </div>


        <button
          type="button"
          className="documents-import-button"
          onClick={handleImportClick}
        >
          <span>＋</span>
          Importer un document
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          multiple
          hidden
          onChange={handleFileImport}
        />

      </div>


      {/* =========================
          SELECTION BAR
      ========================= */}

      <div className="documents-selection-bar">

        <div className="documents-count">

          <strong>
            {documents.length}
          </strong>

          <span>
            {documents.length <= 1
              ? "document"
              : "documents"}
          </span>

        </div>


        <div className="documents-selected-count">

          <span
            className={
              selectedDocuments.length > 0
                ? "selected-number active"
                : "selected-number"
            }
          >
            {selectedDocuments.length}
          </span>

          <span>
            sélectionné
            {selectedDocuments.length > 1 ? "s" : ""}
          </span>

        </div>


        {selectedDocuments.length > 0 && (

          <button
            type="button"
            className="documents-generate-button"
            onClick={generateFromDocuments}
          >
            <span>✦</span>
            Générer avec{" "}
            {selectedDocuments.length === 1
              ? "ce document"
              : "ces documents"}
            <span>→</span>
          </button>

        )}

      </div>


      {/* =========================
          INFO
      ========================= */}

      {selectedDocuments.length === 0 && documents.length > 0 && (

        <div className="documents-info">

          <span className="documents-info-icon">
            ✦
          </span>

          <span>
            Sélectionnez un ou plusieurs documents pour
            les utiliser comme sources lors de la génération.
          </span>

        </div>

      )}


      {/* =========================
          DOCUMENTS
      ========================= */}

      {documents.length > 0 ? (

        <div className="documents-grid">

          {documents.map((document) => {

            const isSelected =
              selectedDocuments.includes(document.id);

            return (

              <article
                key={document.id}
                className={
                  isSelected
                    ? "document-card selected"
                    : "document-card"
                }
              >

                {/* Top */}

                <div className="document-card-top">

                  <div className="document-file-icon">
                    <span>
                      {document.type}
                    </span>
                  </div>


                  <button
                    type="button"
                    className="document-more-button"
                    title="Supprimer"
                    onClick={() =>
                      deleteDocument(document.id)
                    }
                  >
                    ⋮
                  </button>

                </div>


                {/* Content */}

                <div className="document-card-content">

                  <h3 title={document.name}>
                    {document.name}
                  </h3>

                  <div className="document-meta">

                    <span>
                      {document.type}
                    </span>

                    <span>•</span>

                    <span>
                      {document.size}
                    </span>

                  </div>

                  <span className="document-date">
                    Ajouté le {document.date}
                  </span>

                </div>


                {/* Footer */}

                <div className="document-card-footer">

                  <button
                    type="button"
                    className={
                      isSelected
                        ? "document-select-button selected"
                        : "document-select-button"
                    }
                    onClick={() =>
                      toggleDocument(document.id)
                    }
                  >

                    <span>
                      {isSelected ? "✓" : "○"}
                    </span>

                    {isSelected
                      ? "Sélectionné"
                      : "Sélectionner"}

                  </button>


                  <button
                    type="button"
                    className="document-delete-button"
                    onClick={() =>
                      deleteDocument(document.id)
                    }
                  >
                    Supprimer
                  </button>

                </div>

              </article>

            );
          })}

        </div>

      ) : (

        /* =========================
           EMPTY STATE
        ========================= */

        <div className="documents-empty">

          <div className="documents-empty-icon">
            ↑
          </div>

          <h2>
            Aucun document
          </h2>

          <p>
            Importez vos cours, supports ou examens
            pour commencer à créer vos évaluations.
          </p>

          <button
            type="button"
            onClick={handleImportClick}
          >
            ＋ Importer mon premier document
          </button>

        </div>

      )}

    </DashboardLayout>
  );
}

export default Documents;