import { Link } from "react-router-dom";

export const OnboardingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src="quiz.jpg" className="w-96" alt="" />
      <h1 className="text-4xl font-bold text-blue-900">Quiz Wiz</h1>
      <p className="text-lg font-medium max-w-96 text-center pt-5">Unleash your intellect, one question at a time - Welcome to the Educational Quiz!"</p>
      <div className="flex items-center space-x-3 pt-10">
        <Link
          to="/signup"
          className=" px-10 py-3 rounded-lg border border-gray-900 hover:text-white hover:bg-gray-900 font-medium"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="bg-blue-500 font-medium text-white px-10 py-3 rounded-lg hover:bg-blue-800"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

