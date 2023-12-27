import { useEffect, useState } from "react";
import { Pagination, ProductItem } from "..";
import { Product } from "../../models";
import "./ProductList.scss";

type ProductListProps = {
  products: Product[];
  loading: boolean;
  errorMessage: string;
  totalPages: number;
  currentPage: number;
  productsPerPage: number;
  onChangePage: (page: number) => void;
};

export const ProductList = ({
  products,
  loading,
  errorMessage,
  totalPages,
  currentPage,
  productsPerPage,
  onChangePage,
}: ProductListProps): React.ReactNode => {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, products.length);

  const productsToDisplay = products.slice(startIndex, endIndex);
  return (
    <>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ul className="product__list">
        {loading ? (
          "Loading..."
        ) : products.length === 0 && !errorMessage ? (
          <li>Product List is empty</li>
        ) : (
          productsToDisplay.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        )}
      </ul>
    </>
  );
};
