import React, {lazy} from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import RegistrationForm from "./components/RegistrationForm";
import Logout from "./components/Logout";
import StartPage from "./components/StartPage";

import "./styles/index.css";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
