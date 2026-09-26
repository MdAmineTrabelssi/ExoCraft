import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import MyQuizzes from "./pages/MyQuizzes";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={
         <ProtectedRoute>
        <Dashboard />
         </ProtectedRoute>
        }
         />

        <Route path="/create-quiz" element={<CreateQuiz />} />

        <Route path="/my-quizzes" element={<MyQuizzes />}
         />
        <Route path="/history" element={<History />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;