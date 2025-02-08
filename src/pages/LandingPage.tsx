import { ReactElement, Suspense, useState } from "react";
import { Routes, Route, NavLink } from "react-router";
import Dashboard from "../Dashboard";
import Layout from "../UI/Layout";
import AuthenticationPage from "../components/Auth/AuthenticationPage";
import AuthProvider from "../store/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";


const LandingPage = (): ReactElement => {

  // const authContext = useContext()
  //add auth context provider and wrap around routes
  //pass loggedIn boolean to context
  //Dashboard can use useEffect to check auth context value. If not logged in, 

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AuthenticationPage />} />
          <Route index path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>
}

export default LandingPage;