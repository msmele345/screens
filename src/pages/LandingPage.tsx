import { ReactElement, Suspense } from "react";
import { Routes, Route } from "react-router";
import App from "../App";
import AuthenticationPage from "../components/Auth/AuthenticationPage";


const LandingPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<AuthenticationPage />} />
        </Routes>
      </Suspense>
    );
};

export default LandingPage;