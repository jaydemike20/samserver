import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import './App.css';
import Profiles from "./pages/profile.js";
import Home from "./pages/home.js";
import Search from "./pages/search.js";
import History from "./pages/history.js";
import ActivationPage from "./pages/activationpage.js";
import Login from "./login/index.js";
import ResetPage from './pages/resetPassword.js'

function PrivateRoute({ path, element }) {
  const isAuthenticated = false; // Replace with your authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Route path="/home" element={<Home />} />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" replace />} />
        <Route path="/history" element={isAuthenticated ? <History /> : <Navigate to="/" replace />} />
        <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/" replace />} />
        <Route path="/profile" element={isAuthenticated ? <Profiles /> : <Navigate to="/" replace />} />
        <Route path="/activation/:uid/:token" element={<ActivationPage />} />
        <Route path="/reset_password/:uid/:token" element={<ResetPage />} />

      </Routes>
    </div>
  );
}

export default App;
