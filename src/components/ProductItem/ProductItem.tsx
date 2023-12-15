import { useEffect } from "react";
import { Product } from "../../models";
import "./ProductItem.scss";

type ProductItemProps = {
  product: Product;
};

export const ProductItem = ({ product }: ProductItemProps): React.ReactNode => {
  useEffect(() => {
    console.log(product);
  }, []);
  return (
    <li>
      <img src={product.image_url} alt={`${product.name} image`} />
      <p>{product.name}</p>
      <p>{product.price}</p>
      <p>{product.seller.username}</p>
    </li>
  );
};
