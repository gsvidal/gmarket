import { useEffect, useState } from "react";
import { useFetchAndLoad } from ".";
import { Product } from "../models";

export const useFetchProducts = (fetchProductsFunc: Function, dependency?: boolean) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, callEndPoint } = useFetchAndLoad();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const response = await callEndPoint(fetchProductsFunc());
        const data = await response.data;
        // console.log(data);
        setProducts(data.products);
        setErrorMessage("");
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };
    fetchSellerProducts();
  }, [dependency]);

  return { products, loading, errorMessage };
};
