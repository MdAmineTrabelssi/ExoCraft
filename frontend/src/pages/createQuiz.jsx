import { Navigate } from "react-router-dom";

// Keep saved links to the old form working with the supported quiz generator.
export default function CreateQuiz() {
  return <Navigate to="/generator" replace state={{ contentType: "quiz" }} />;
}
