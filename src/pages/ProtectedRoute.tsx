import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
    children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn } = useAuth();

    if(!isLoggedIn) {
        return <Navigate to="/" replace/>
    }

    return children;
};

export default ProtectedRoute; 