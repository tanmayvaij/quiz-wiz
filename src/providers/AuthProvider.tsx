import { User, onAuthStateChanged } from "firebase/auth";
import {
  Dispatch,
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
  setUser: Dispatch<React.SetStateAction<User|null>>;
}

const context = createContext<ContextProps>({
  user: null,
  setUser: () => {},
});

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    
    onAuthStateChanged(auth, user => {
      setUser(user);
    });

  }, []);

  return (
    <context.Provider value={{ user, setUser }}>{children}</context.Provider>
  );
};

export const useAuth = () => useContext(context);

export default AuthProvider;
