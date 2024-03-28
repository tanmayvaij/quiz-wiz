import { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toastConfig } from "../config/toastConfig";
import { toast } from "react-toastify";

export const SignUpCard = () => {
  const navigate = useNavigate();

  const [cred, setCred] = useState({
    email: "",
    password: "",
  });

  const createUser = () => {
    toast.promise(
      createUserWithEmailAndPassword(auth, cred.email, cred.password),
      {
        pending: "Please Wait",
        success: {
          render() {
            navigate("/");
            return "Account created successfully";
          },
        },
        error: {
          render({ data }: { data: { message: string } }) {
            return data?.message;
          },
        },
      },
      toastConfig
    );
  };

  return (
    <div>
      <h3 className="font-medium text-xl p-4 text-center">Sign Up</h3>
      <div className="flex flex-col space-y-2">
        <input
          type="email"
          name="email"
          placeholder="Enter you email"
          className="border rounded-md p-3 w-72"
          value={cred.email}
          onChange={(e) =>
            setCred({ ...cred, [e.target.name]: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Set your password"
          className="border rounded-md p-3 w-72"
          value={cred.password}
          onChange={(e) =>
            setCred({ ...cred, [e.target.name]: e.target.value })
          }
        />
        <button
          onClick={createUser}
          className="bg-blue-600 text-white rounded-md py-3 hover:bg-blue-700"
        >
          Create Account
        </button>
      </div>
      <div className="pt-5">
        <p className="text-center">
          Already have an account ?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-500 hover:text-blue-800"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
