import Navbar from "../components/Navbar";

function History() {
  return (
    <div className="history-page">
      <Navbar />

      <main className="history-container">

        <div className="history-header">
          <h1>Historique</h1>

          <p>
            Consultez vos résultats et vos anciennes tentatives.
          </p>
        </div>

        <div className="history-list">

          <div className="history-item">
            <div>
              <h2>Exemple de quiz</h2>

              <p>
                Cloud Computing • 10 questions
              </p>
            </div>

            <div className="history-result">
              <span>Score</span>
              <strong>8 / 10</strong>
            </div>
          </div>

          <div className="empty-message">
            <p>
              Vos résultats apparaîtront ici après avoir réalisé des quiz.
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}

export default History;
