import { User, onAuthStateChanged } from "firebase/auth";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebaseConfig";

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

interface ContextProps {
  user: null | User;
}

const context = createContext<ContextProps>({
  user: null,
});

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return <context.Provider value={{ user }}>{children}</context.Provider>;
};

export const useAuth = () => useContext(context);

export default AuthProvider;
