import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { CiLogout } from "react-icons/ci";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();

  const userSignOut = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div
      className={`shadow-sm p-2 flex items-center justify-between ${
        location.pathname == "/" && !user && "hidden"
      }`}
    >
      {location.pathname !== "/" ? (
        <button
          onClick={() => navigate(-1)}
          className="border rounded-md p-2 hover:bg-slate-200"
        >
          <IoMdArrowRoundBack className="text-2xl" />
        </button>
      ) : (
        <span></span>
      )}

      {user && (
        <button
          onClick={userSignOut}
          className="bg-gray-800 text-sm hover:bg-gray-950 text-white shadow-sm p-3 rounded-md"
        >
          <CiLogout className="font-bold text-white text-lg" />
        </button>
      )}
    </div>
  );
};
