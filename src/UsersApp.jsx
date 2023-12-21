import { LoginPage } from "./auth/pages/LoginPage";
import { UsersPage } from "./pages/UsersPage";
import { Navbar } from "./components/layout/Navbar";
import { useAuth } from "./auth/hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { AuthContext } from "./auth/context/AuthContext";
import { useContext } from "react";



export const UsersApp = () => {

  const {login} = useContext(AuthContext)

  return (
    <Routes>
      {login.isAuth
        ?
        (
          <Route path="/*" element={<UserRoutes  />} />
        )

        :
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to={"/login"} />} />
        </>

      }

    </Routes>
  );
};
