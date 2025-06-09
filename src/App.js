import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./components/Container";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Balance from "./components/Balance";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/balance"
          element={
            <>
              <Navbar />
              <div className="container">
                <Balance />
              </div>
            </>
          }
        />
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
