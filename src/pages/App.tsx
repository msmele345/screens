import { ReactElement } from "react";
import { Route, Routes } from "react-router";
import Dashboard from "../Dashboard";
import Layout from "../UI/Layout";
import AuthenticationPage from "../components/Auth/AuthenticationPage";
import AuthProvider from "../store/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";


const App = (): ReactElement => {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<AuthenticationPage />} />
          <Route index path="/" element={
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

export default App;