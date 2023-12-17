import { Product } from "../../models";
import "./ProductItem.scss";
import noImagePlaceholder from "/images/no-image.png";

type ProductItemProps = {
  product: Product;
};

const API_URL = import.meta.env.VITE_API_URL as string;

const discount = (base: number, price: number) => {
  const discount = ((price - base) / base) * 100;
  return discount.toFixed(2);
};

export const ProductItem = ({ product }: ProductItemProps): React.ReactNode => {
  const { base_price, price } = product;
  return (
    <li className="product">
      <img className="product__image"
        src={
          product.image_url
            ? `${API_URL}${product.image_url}`
            : noImagePlaceholder
        }
        alt={`${product.name} image`}
        width="280"
      />
      <p>{product.brand}</p>
      <p>{product.name}</p>
      {/* <p>{product.description}</p> */}
      <p>{product.price}</p>
      <p>{discount(+base_price, +price)}%</p>
      <p className="base-price">{product.base_price}</p>
      <p>Stock: {product.stock}</p>
      <p>{product.seller.username}</p>
    </li>
  );
};
