import { ReactElement, Suspense } from "react";
import { Routes, Route } from "react-router";
import App from "../App";


const LandingPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Suspense>
    );
};

export default LandingPage;