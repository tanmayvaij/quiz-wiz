import { SignUpCard, GoogleSignIn,  } from "../components"

export const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-58px)]">
      <SignUpCard />
      <GoogleSignIn />
    </div>
  );
};
