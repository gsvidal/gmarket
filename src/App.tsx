import { Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage, Login, Register, Dashboard } from "./pages";
import { AuthGuard } from "./guards/auth.guards";
import { PrivateRoutes, PublicRoutes } from "./models";
import { Header } from "./components";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={PublicRoutes.HOME} element={<HomePage />} />
        <Route path={PublicRoutes.LOGIN} element={<Login />} />
        <Route path={PublicRoutes.REGISTER} element={<Register />} />
        <Route element={<AuthGuard />}>
          <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        </Route>
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </>
  );
}

export default App;