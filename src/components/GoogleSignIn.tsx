import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebaseConfig";

export const GoogleSignIn = () => {
  const navigate = useNavigate();

  const path = useLocation().pathname;

  const googleProvider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex items-center space-x-5 p-8">
        <span className="w-28 border-b-2"></span>
        <span>OR</span>
        <span className="w-28 border-b-2"></span>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={signIn}
          className="bg-gray-800 flex items-center space-x-5 hover:bg-gray-950 text-white shadow-sm px-7 py-4 rounded-md"
        >
          <img src="glogo.png" className="rounded-full w-6" alt="" />
          <span>{path === "/login" ? "Log in" : "Sign up"} with Google</span>
        </button>
      </div>
    </div>
  );
};
