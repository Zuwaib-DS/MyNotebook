import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./components/container";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/login";
import Signup from "./components/signup";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Container />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
