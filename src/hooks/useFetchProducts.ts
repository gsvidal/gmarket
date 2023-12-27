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
  fetchProductsFunc: Function
) => {
  const { loading, callEndPoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const location = useLocation();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
        setTotalPages(data.pagination_info.total_pages);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };
    fetchSellerProducts();
  }, []);

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  return { loading, errorMessage, totalPages, currentPage, changePage };
};
