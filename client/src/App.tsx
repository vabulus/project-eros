import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute"; // Make sure to import this
import RegistrationForm from "./components/RegistrationForm";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
