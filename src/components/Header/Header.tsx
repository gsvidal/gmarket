import { NavLink, useNavigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../../models";
import { AppStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { logout } from "../../services/public.service";
import { useFetchAndLoad } from "../../hooks";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/states/user.slice";
import "./Header.scss";
import { Button } from "..";
import { useState } from "react";
import menuIcon from "/icons/menu.svg";
import closeIcon from "/icons/close.svg";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, isUserAuth, token, role } = useSelector(
    (store: AppStore) => store.user
  );
  const { loading: logoutLoading, callEndPoint } = useFetchAndLoad();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);

  const notAuth = (): React.ReactNode => {
    return (
      <>
        <li className="header__nav__item header__auth__item">
          <Button onClick={closeHamburger}>
            <NavLink to={PublicRoutes.REGISTER}>Register</NavLink>
          </Button>
        </li>
        <li className="header__nav__item header__auth__item">
          <Button onClick={closeHamburger}>
            <NavLink to={PublicRoutes.LOGIN}>Login</NavLink>
          </Button>
        </li>
      </>
    );
  };
  const handleLogout = async () => {
    try {
      await callEndPoint(logout(token));
      // TODO: Toast
      // <Toast message={data.message} />
      dispatch(resetUser());
      localStorage.removeItem("user");
      navigate(PublicRoutes.HOME);
      closeHamburger();
    } catch (error: any) {
      // TODO: Toast
      // <Toast message={error.message} />
    }
  };

  const openHamburger = () => {
    setIsHamburgerOpen(true);
  };

  const closeHamburger = () => {
    setIsHamburgerOpen(false);
  };

  return (
    <>
      <div
        className={`hamburger__menu glassy ${
          isHamburgerOpen ? "open" : "closed"
        }`}
      ></div>
      <div className="header-container glassy">
        <nav className="header">
          <NavLink to={PublicRoutes.HOME} className="header__logo">
            <span className="header__logo-capital">G</span>
            <span className="header__logo-lower">market</span>
          </NavLink>
          <span
            className={`hamburger__icon hamburger__icon--menu ${
              isHamburgerOpen ? "closed" : "open"
            }`}
            onClick={openHamburger}
          >
            <img src={menuIcon} alt="menu icon" />
          </span>
          <span
            className={`hamburger__icon hamburger__icon--close ${
              isHamburgerOpen ? "open" : "closed"
            }`}
            onClick={closeHamburger}
          >
            <img src={closeIcon} alt="close icon" />
          </span>

          <div
            className={`header__nav header__menu ${
              isHamburgerOpen ? "open" : "closed"
            }`}
          >
            <li className={`header__nav__item header__menu__item`}>
              <NavLink to={PublicRoutes.HOME} onClick={closeHamburger}>
                Home
              </NavLink>
            </li>
            {isUserAuth && role === "Seller" && (
              <li className="header__nav__item header__menu__item">
                <NavLink to={PrivateRoutes.DASHBOARD} onClick={closeHamburger}>
                  Dashboard
                </NavLink>
              </li>
            )}
          </div>
          <ul
            className={`header__nav header__auth ${
              isHamburgerOpen ? "open" : "closed"
            }`}
          >
            {isUserAuth ? (
              <>
                {/* <div className="list-item list-item--auth"> */}
                <li className="header__nav__item header__auth__item">
                  {username}
                </li>
                <li className="header__nav__item header__auth__item">
                  {" "}
                  <Button>
                    <NavLink to="" onClick={handleLogout}>
                      Logout
                    </NavLink>
                  </Button>
                </li>
                {/* </div> */}
              </>
            ) : logoutLoading ? (
              // <div className="list-item list-item--auth">
              <li className="header__nav__item header__auth__item">
                Logging out...
              </li>
            ) : (
              // </div>
              notAuth()
            )}
          </ul>
          {/* </div> */}
        </nav>
      </div>
    </>
  );
};
