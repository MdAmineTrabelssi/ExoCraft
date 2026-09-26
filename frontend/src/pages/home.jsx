import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <main className="hero">
        <div className="hero-content">
          <h1>ExoCraft</h1>

          <h2>Générez vos quiz intelligemment</h2>

          <p>
            Créez rapidement des quiz à partir de vos cours et chapitres.
          </p>

          <Link to="/login" className="start-button">
            Commencer
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;