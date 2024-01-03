import { ChangeEvent, useState } from "react";
import "./ProductsPerPageFilter.scss";

type ProductsPerPageFilterProps = {
  setProductsPerPage: (num: number) => void;
};

export const ProductsPerPageFilter = ({
  setProductsPerPage,
}: ProductsPerPageFilterProps): React.ReactNode => {
  const [selectValue, setSelectValue] = useState<number>(10);
  const handleProductsAmount = (event: ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(+event.target.value);
    setSelectValue(+event.target.value);
  };

  return (
    <div className="products-per-page">
      <label htmlFor="products-amount">Products per page: </label>
      <select
        name="products-amount"
        id="products-amount"
        onChange={handleProductsAmount}
        // defaultValue={10}
        value={selectValue}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};
