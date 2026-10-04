import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import MyQuizzes from "./pages/MyQuizzes";
import Documents from "./pages/Documents";
import Generator from "./pages/Generator";
import History from "./pages/History";
import Settings from "./pages/Settings";
import MyContent from "./pages/MyContent";
import Archives from "./pages/Archives";

import GeneratedQuiz from "./pages/GeneratedQuiz";
import GeneratedExam from "./pages/GeneratedExam";
import GeneratedCourse from "./pages/GeneratedCourse";
import GeneratedExercises from "./pages/GeneratedExercises";

import QuizResult from "./pages/QuizResult";
import CourseResult from "./pages/CourseResult";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC PAGES
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            PROTECTED PAGES
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generator"
          element={
            <ProtectedRoute>
              <Generator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-quiz"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-quizzes"
          element={
            <ProtectedRoute>
              <MyQuizzes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-content"
          element={
            <ProtectedRoute>
              <MyContent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/archives"
          element={
            <ProtectedRoute>
              <Archives />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />


        {/* =========================
            GENERATED CONTENT
        ========================= */}

        <Route
          path="/generated-quiz"
          element={
            <ProtectedRoute>
              <GeneratedQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generated-exam"
          element={
            <ProtectedRoute>
              <GeneratedExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generated-course"
          element={
            <ProtectedRoute>
              <GeneratedCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generated-exercises"
          element={
            <ProtectedRoute>
              <GeneratedExercises />
            </ProtectedRoute>
          }
        />


        {/* =========================
            RESULTS
        ========================= */}

        <Route
          path="/quiz-result"
          element={
            <ProtectedRoute>
              <QuizResult />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course-result"
          element={
            <ProtectedRoute>
              <CourseResult />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;