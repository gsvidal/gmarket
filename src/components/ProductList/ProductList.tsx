import { ProductItem } from "..";
import { Product } from "../../models";

type ProductListProps = {
  products: Product[];
  loading: boolean;
  errorMessage: string;
};

export const ProductList = ({
  products,
  loading,
  errorMessage,
}: ProductListProps): React.ReactNode => {
  return (
    <>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ul>
        {loading ? (
          "Loading..."
        ) : products.length === 0 && !errorMessage ? (
          <li>Product List is empty</li>
        ) : (
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        )}
      </ul>
    </>
  );
};
