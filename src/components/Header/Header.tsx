import { NavLink, useNavigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../../models";
import { AppStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { logout } from "../../services/public.service";
import { useFetchAndLoad } from "../../hooks";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/states/user.slice";
import { useEffect } from "react";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, isUserAuth, token, role } = useSelector(
    (store: AppStore) => store.user
  );
  const { loading: logoutLoading, callEndPoint } = useFetchAndLoad();

  const notAuth = (): React.ReactNode => {
    return (
      <>
        <li>
          <NavLink to={PublicRoutes.REGISTER}>Register</NavLink>
        </li>
        <li>
          <NavLink to={PublicRoutes.LOGIN}>Login</NavLink>
        </li>
      </>
    );
  };
  const handleLogout = async () => {
    try {
      console.log("before logout response");
      console.log("token", token);
      const data: any = await callEndPoint(logout(token));
      console.log("data", data);
      console.log("after logout response");
      // TODO: Toast
      dispatch(resetUser());
      localStorage.removeItem("user");
      navigate(PublicRoutes.HOME);
    } catch (error: any) {
      // TODO: Toast
      console.log(error.message);
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to={PublicRoutes.HOME}>Gmarket</NavLink>
          </li>
          <li>
            <NavLink to={PublicRoutes.HOME}>Home</NavLink>
          </li>
          {isUserAuth ? (
            <>
              {role === "Seller" && <li><NavLink to={PrivateRoutes.DASHBOARD}>Dashboard</NavLink></li>}
              <li>{username}</li>
              <li>
                <NavLink to="" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
            </>
          ) : logoutLoading ? (
            <li>Logging out...</li>
          ) : (
            notAuth()
          )}
        </ul>
      </nav>
    </>
  );
};
