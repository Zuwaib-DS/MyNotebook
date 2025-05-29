import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./components/Container";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login"
import Signup from "./components/Signup";


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
