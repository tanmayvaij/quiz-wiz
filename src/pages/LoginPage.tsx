import { LoginCard, GoogleSignIn } from "../components"

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-58px)]">
        <LoginCard />
        <GoogleSignIn />
    </div>
  );
};
