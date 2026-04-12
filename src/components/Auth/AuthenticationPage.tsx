import { ReactElement } from "react";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import AuthForm from "./AuthForm";

const AuthenticationPage = (): ReactElement => {
    const { isLoggedIn } = useAuth();

    if(isLoggedIn) {
        console.log("IS LOGGED IN AUTH PAGE: " + isLoggedIn)
        return <Navigate to="/" replace/>
    }

    return (
        <>
          <AuthForm/> 
        </>
    )
};

export default AuthenticationPage;