import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useAuth } from "./providers/AuthProvider";
import {Navbar} from "./components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  LoginPage,
  SignupPage,
  OnboardingPage,
  DashboardPage,
  DataSciencePage,
  MathematicsPage,
} from "./pages";

const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      {user ? (
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/maths-quiz" element={<MathematicsPage />} />
          <Route path="/data-science-quiz" element={<DataSciencePage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
