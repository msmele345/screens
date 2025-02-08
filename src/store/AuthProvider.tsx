import { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext<{
    isLoggedIn: boolean,
    onLogin: (username: string, password: string) => void,
    onLogout: () => void
}>({
    isLoggedIn: false,
    onLogin: () => {},
    onLogout: () => {}
});

type AuthProviderProps = {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const navigate = useNavigate();

     const handleLoginEvent = (username: string, password: string) => {
         //make api call here?
         //if success, 
        setIsLoggedIn(true) //if login succeeds
        navigate("/dashboard")
        //OR  setIsLoggedIn(false) and redirect?
      }

      const handleLogout = () => {
        setIsLoggedIn(false); //pass to navigation along with isLogged in value
      };

      const values = {
        isLoggedIn: isLoggedIn,
        onLogin: handleLoginEvent,
        onLogout: handleLogout
      }
    
      return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};

export default AuthProvider;