import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage, Login, Register } from "./pages";
import { AuthGuard } from "./guards/auth.guards";
import { PrivateRoutes, PublicRoutes } from "./models";
import { Header } from "./components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "./redux/states/user.slice";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.token) {
      dispatch(authUser(user));
    }
    setIsLoading(false);
  }, [dispatch]);

  return (
    <>
      <Header />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Suspense fallback={<p>Loading your Dashboard...</p>}>
          <Routes>
            <Route path={PublicRoutes.HOME} element={<HomePage />} />
            <Route path={PublicRoutes.LOGIN} element={<Login />} />
            <Route path={PublicRoutes.REGISTER} element={<Register />} />
            <Route element={<AuthGuard />}>
              <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
            </Route>
            <Route path="*" element={<>Not found</>} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
