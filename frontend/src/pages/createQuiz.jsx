import Navbar from "../components/Navbar";

function CreateQuiz() {
  return (
    <div className="create-quiz-page">
      <Navbar />

      <main className="create-quiz-container">

        <div className="create-quiz-header">
          <h1>Créer un quiz</h1>

          <p>
            Préparez votre quiz à partir de votre cours.
          </p>
        </div>

        <form className="quiz-form">

          <div className="form-group">
            <label htmlFor="title">
              Titre du quiz
            </label>

            <input
              type="text"
              id="title"
              placeholder="Exemple : Introduction à AWS"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">
              Matière
            </label>

            <input
              type="text"
              id="subject"
              placeholder="Exemple : Cloud Computing"
            />
          </div>

          <div className="form-group">
            <label htmlFor="chapter">
              Chapitre
            </label>

            <input
              type="text"
              id="chapter"
              placeholder="Exemple : AWS EC2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">
              Difficulté
            </label>

            <select id="difficulty">
              <option value="easy">Facile</option>
              <option value="medium">Moyenne</option>
              <option value="hard">Difficile</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="questions">
              Nombre de questions
            </label>

            <input
              type="number"
              id="questions"
              min="1"
              max="50"
              placeholder="Exemple : 10"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">
              Contenu du cours
            </label>

            <textarea
              id="content"
              rows="8"
              placeholder="Collez ici le contenu de votre cours..."
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Générer le quiz
          </button>

        </form>

      </main>
    </div>
  );
}

export default CreateQuiz;