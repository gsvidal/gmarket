import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import "./HomePage.scss";
import { useFetchProducts } from "../../hooks";
import { getAllProducts } from "../../services/public.service";
import { Pagination, ProductList } from "../../components";
import { useState, ChangeEvent, useEffect } from "react";

type HomePageProps = {};

export const HomePage = (): React.ReactNode => {
  const [productsPerPage, setProductsPerPage] = useState<number>(5);
  const { username } = useSelector((store: AppStore) => store.user);
  const { loading, errorMessage, totalPages, currentPage, changePage } =
    useFetchProducts(() => getAllProducts(1, productsPerPage));
  const { allProducts } = useSelector((store: AppStore) => store.product);

  const handleProductsAmount = (event: ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(+event.target.value);
  };

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
      <div className="products-per-page">
        <label htmlFor="products-amount">Products per page: </label>
        <select
          name="products-amount"
          id="products-amount"
          onChange={handleProductsAmount}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

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
