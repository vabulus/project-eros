import React, { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LoginForm from "./pages/LoginForm";
import Profile from "./pages/Profile";
import RegistrationForm from "./pages/RegistrationForm";
import Logout from "./pages/Logout";
import Dashboard from "./components/dashboard";

import "./styles/index.css";
import "./styles/App.css";
import LoveLog, {LoveLogProvider} from "./components/LoveLog";
import LoveLogsOverview from "./pages/LoveLogsOverview";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>

          <Route path="/" element={
            <LoveLogProvider>
              <LoveLog />
            </LoveLogProvider>
          } />

          <Route path="/overview" element={<LoveLogsOverview />} />

          <Route path="/dashboard" element={<Dashboard />} />
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
