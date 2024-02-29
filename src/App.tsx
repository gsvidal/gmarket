import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { HomePage, Login, Register } from "./pages";
import { AuthGuard } from "./guards/auth.guards";
import { CartProduct, PrivateRoutes, PublicRoutes } from "./models";
import { Header, Loader, ToastNotification } from "./components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "./redux/states/user.slice";
import { useSelector } from "react-redux";
import { AppStore } from "./redux/store";
import { ShoppingCartGuard } from "./guards/shooping-cart.guards";
import { ShoppingCart } from "./pages/ShoppingCart/ShoppingCart";
import { useFetchAndLoad } from "./hooks";
import { getCart } from "./services/public.service";
import { setCart } from "./redux/states/cart.slice";
import { setToastNotification } from "./redux/states/toastNotification.slice";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { loading: getCartLoading, callEndPoint } = useFetchAndLoad();
  const { isShown } = useSelector((store: AppStore) => store.toast);
  const { username, token } = useSelector((store: AppStore) => store.user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.token) {
      dispatch(authUser(user));
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (username) {
      const fetchCart = async () => {
        try {
          const {
            data: { cartItems, cartTotalQuantity, cartTotalPrice },
          } = await callEndPoint(getCart(token));
          dispatch(
            setCart({
              cartItems,
              cartTotalQuantity,
              cartTotalPrice,
            })
          );
        } catch (error: any) {
          dispatch(
            setToastNotification({ message: error.message, type: "danger" })
          );
        }
      };
      fetchCart();
    }
  }, [username]);

  return (
    <>
      {isShown && <ToastNotification />}
      <Header getCartLoading={getCartLoading} />
      {isLoading ? (
        <Loader />
      ) : (
        <Suspense fallback={<p>Loading your Dashboard...</p>}>
          <Routes>
            <Route path={PublicRoutes.HOME} element={<HomePage />} />
            <Route path={PublicRoutes.LOGIN} element={<Login />} />
            <Route path={PublicRoutes.REGISTER} element={<Register />} />
            <Route element={<AuthGuard />}>
              <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
            </Route>
            <Route element={<ShoppingCartGuard />}>
              <Route path={PublicRoutes.CART} element={<ShoppingCart />} />
            </Route>
            <Route path="*" element={<>Not found</>} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
