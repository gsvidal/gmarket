import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models";

export const ShoppingCartGuard = () => {
  const { role } = useSelector((store: AppStore) => store.user);
  return role === "Seller" ? (
    <Navigate replace to={PublicRoutes.HOME} />
  ) : (
    <Outlet />
  );
};
