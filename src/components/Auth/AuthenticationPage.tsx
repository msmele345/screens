import { ReactElement, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import AuthForm from "./AuthForm";

const AuthenticationPage = (): ReactElement => {
    const { isLoggedIn } = useAuth();

    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log("IS LOGGED IN AUTH PAGE: " + isLoggedIn)
    //     if(isLoggedIn) {
    //         return <Navigate to="/" replace/>
    //     }
    // }, [isLoggedIn])

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