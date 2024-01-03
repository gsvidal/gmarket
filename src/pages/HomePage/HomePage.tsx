import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import "./HomePage.scss";
import { useFetchProducts } from "../../hooks";
import { getAllProducts } from "../../services/public.service";
import { ProductList, ProductsPerPageFilter } from "../../components";
import { useState, useEffect } from "react";

export const HomePage = (): React.ReactNode => {
  const [productsPerPage, setProductsPerPage] = useState<number>(10);
  const { username } = useSelector((store: AppStore) => store.user);
  const { loading, errorMessage, totalPages, currentPage, changePage } =
    useFetchProducts(() => getAllProducts(1, productsPerPage));
  const { allProducts } = useSelector((store: AppStore) => store.product);
  const [localTotalPages, setLocalTotalPages] = useState<number>(totalPages);

  // Update localTotalPages when productsPerPage changes
  useEffect(() => {
    setLocalTotalPages(Math.ceil(allProducts.length / productsPerPage));
  }, [allProducts, productsPerPage]);

  return (
    <main className="homepage">
      <h1 className="title homepage__title">
        Welcome {username && username}!{" "}
      </h1>
      <h3>You can find any products here:</h3>
      <ProductsPerPageFilter setProductsPerPage={setProductsPerPage} />

      <ProductList
        products={allProducts}
        loading={loading}
        errorMessage={errorMessage}
        totalPages={localTotalPages}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        onChangePage={changePage}
      />
    </main>
  );
};
