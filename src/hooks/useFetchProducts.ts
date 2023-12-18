import { useEffect, useState } from "react";
import { useFetchAndLoad } from ".";
import { productsAdapter } from "../adapters";
import { useDispatch } from "react-redux";
import {
  saveAllProducts,
  saveSellerProducts,
} from "../redux/states/product.slice";
import { useLocation } from "react-router-dom";

export const useFetchProducts = (
  fetchProductsFunc: Function,
  dependency?: boolean
) => {
  const { loading, callEndPoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const response = await callEndPoint(fetchProductsFunc());
        const data = await response.data;
        dispatch(
          isDashboard
            ? saveSellerProducts(productsAdapter(data.products))
            : saveAllProducts(productsAdapter(data.products))
        );
        setErrorMessage("");
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };
    fetchSellerProducts();
  }, [dependency]);

  return { loading, errorMessage };
};
