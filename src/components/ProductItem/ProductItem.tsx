import { useSelector } from "react-redux";
import { useFetchAndLoad } from "../../hooks";
import { Product } from "../../models";
import { deleteProduct } from "../../services/public.service";
import "./ProductItem.scss";
import noImagePlaceholder from "/images/no-image.png";
import { useLocation } from "react-router-dom";
import { AppStore } from "../../redux/store";

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
  const location = useLocation();
  const currentUrl = location.pathname;
  const { loading, callEndPoint } = useFetchAndLoad();
  const { token } = useSelector((store: AppStore) => store.user);

  const handleDelete = async (productId: number) => {
    try {
      const response = await callEndPoint(deleteProduct(productId, token));
      console.log(response)
      const data = await response.data;
      console.log(data)
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="product">
      <img
        className="product__image"
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
      <p>{product.price}</p>
      <p>{discount(+base_price, +price)}%</p>
      <p className="base-price">{product.base_price}</p>
      <p>Stock: {product.stock}</p>
      <p>{product.seller.username}</p>
      {currentUrl === "/dashboard" && (
        <button onClick={() => handleDelete(product.id)}>Delete</button>
      )}
    </li>
  );
};
