import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';

import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import Profile from "./Profile";
import ProtectedRoute from './ProtectedRoute'; // Make sure to import this


const App: React.FC = () => {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
