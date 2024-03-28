import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../config/toastConfig";

export const LoginCard = () => {
  const navigate = useNavigate();

  const [cred, setCred] = useState({
    email: "",
    password: "",
  });

  const userLogIn = () => {
    toast.promise(
      signInWithEmailAndPassword(auth, cred.email, cred.password),
      {
        pending: "Please Wait",
        success: {
          render() {
            navigate("/");
            return "Logged in successfully";
          },
        },
        error: {
          render({ data }: { data: { message: string } }) {
              return data?.message
          },
        }
      },
      toastConfig
    );
  };

  return (
    <div>
      <h3 className="font-medium text-xl p-4 text-center">Log In</h3>
      <div className="flex flex-col space-y-2">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="border rounded-md p-3 w-72"
          value={cred.email}
          onChange={(e) =>
            setCred({ ...cred, [e.target.name]: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="border rounded-md p-3 w-72"
          value={cred.password}
          onChange={(e) =>
            setCred({ ...cred, [e.target.name]: e.target.value })
          }
        />
        <button
          onClick={userLogIn}
          className="bg-blue-600 text-white rounded-md py-3 hover:bg-blue-700"
        >
          Log In
        </button>
      </div>
      <div className="pt-5">
        <p className="text-center">
          Don't have an account ?{" "}
          <Link to="/signup"
            className="font-medium text-blue-500 hover:text-blue-800"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
