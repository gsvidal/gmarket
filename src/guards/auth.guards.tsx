import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models";
import { HomePage } from "../pages";

export const AuthGuard = () => {
  const { isUserAuth, role } = useSelector((store: AppStore) => store.user);
  return !isUserAuth ? (
    <Navigate replace to={PublicRoutes.LOGIN} />
  ) : role !== "Seller" ? (
    <HomePage />
  ) : (
    <Outlet />
  );
};
