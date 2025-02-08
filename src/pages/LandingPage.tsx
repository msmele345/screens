import { ReactElement, Suspense } from "react";
import { Routes, Route, NavLink } from "react-router";
import App from "../App";
import Layout from "../UI/Layout";


const LandingPage = (): ReactElement => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="*" element={<NoMatch />} />
          {/* <Route index element={<Login - placeholder />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>
}

export default LandingPage;