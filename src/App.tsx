import HelpPage from "./pages/helpPage";
import HandleImovelPage from "./pages/handleImovelPage";
import UserPage from "./pages/userPage";
import Layout from "./pages/Layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import React, { useContext } from "react";
import { TailSpin } from "react-loader-spinner";

import { AuthProvider, AuthContext } from "./providers/auth";

type PrivateProps = {
  children: JSX.Element;
};
function App() {
  const Private = ({ children }: PrivateProps) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return (
        <div className=" w-screen h-screen flex flex-col justify-center items-center">
          <TailSpin />
        </div>
      );
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div className="h-screen w-full">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Private>
                  <Layout />
                </Private>
              }
            >
              <Route
                path="help"
                element={
                  <Private>
                    <HelpPage />
                  </Private>
                }
              />
              <Route
                path="imovel"
                element={
                  <Private>
                    <HandleImovelPage />
                  </Private>
                }
              />
              <Route
                path="user"
                element={
                  <Private>
                    <UserPage />
                  </Private>
                }
              />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
