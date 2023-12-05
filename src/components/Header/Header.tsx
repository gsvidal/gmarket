import { NavLink, useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models";
import { AppStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { logout } from "../../services/public.service";
import { useFetchAndLoad } from "../../hooks";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/states/user.slice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserAuth } = useSelector((store: AppStore) => store.user);
  const { loading, callEndPoint } = useFetchAndLoad();

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
      const data: any = await callEndPoint(logout());
      console.log(data.message)
      dispatch(resetUser());
      navigate(PublicRoutes.HOME);
    } catch (error: any) {
      console.log(error)
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
            <li>
              <NavLink to="" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          ) : (
            notAuth()
          )}
        </ul>
      </nav>
    </>
  );
};
