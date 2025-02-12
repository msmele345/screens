import { createContext, useEffect, useState } from "react";
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
     const navigate = useNavigate();

     const [isLoggedIn, setIsLoggedIn] = useState(false);

     useEffect(() => {
      const loggedInStatus = localStorage.getItem('isLoggedIn');
      if(loggedInStatus && loggedInStatus == 'true') {
        setIsLoggedIn(true);
        navigate("/");
      }
     }, []);

     const handleLoginEvent = (username: string, password: string) => {
         //make api call here?
         //if success, 
        setIsLoggedIn(true) //if login succeeds
        localStorage.setItem('isLoggedIn', 'true') //replace by storing sessionId in User or seperate Session comosos container
        navigate("/")
      }

      const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false')
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
        //for redirect back to previous page before auth  check occurred. Only needed if there are multiple pages
        //  const location = useLocation();
        // const origin = location.state?.from?.pathname || '/';
        // navigate(origin);