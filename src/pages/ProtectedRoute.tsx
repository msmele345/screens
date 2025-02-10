import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

type ProtectedRouteProps = {
    children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn } = useAuth();

    if(!isLoggedIn) {
        return <Navigate to="/login" replace/>
    }

    return children;
};

export default ProtectedRoute; 