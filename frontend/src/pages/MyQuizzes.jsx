import Navbar from "../components/Navbar";

function MyQuizzes() {
  return (
    <div className="my-quizzes-page">
      <Navbar />

      <main className="my-quizzes-container">

        <div className="my-quizzes-header">
          <h1>Mes quiz</h1>

          <p>
            Retrouvez ici tous les quiz que vous avez créés.
          </p>
        </div>

        <div className="quiz-list">

          <div className="quiz-item">
            <div>
              <h2>Exemple de quiz</h2>

              <p>
                Cloud Computing • 10 questions
              </p>
            </div>

            <button>
              Ouvrir
            </button>
          </div>

          <div className="empty-message">
            <p>
              Les quiz créés apparaîtront ici.
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}

export default MyQuizzes;