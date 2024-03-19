import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={signIn}
        className="bg-gray-800 hover:bg-gray-950 text-white shadow-sm px-10 py-4 rounded-md"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default OnboardingPage;
