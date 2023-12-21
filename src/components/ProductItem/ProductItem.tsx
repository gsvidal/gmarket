import { useSelector } from "react-redux";
import { useFetchAndLoad } from "../../hooks";
import { Product } from "../../models";
import { deleteProduct, updateProduct } from "../../services/public.service";
import "./ProductItem.scss";
import noImagePlaceholder from "/images/no-image.png";
import { useLocation } from "react-router-dom";
import { AppStore } from "../../redux/store";
import { removeProduct } from "../../redux/states/product.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Modal } from "..";

type ProductItemProps = {
  product: Product;
};

const API_URL = import.meta.env.VITE_API_URL as string;

const discount = (base: number, price: number) => {
  const discount = ((price - base) / base) * 100;
  return discount.toFixed(2);
};

export const ProductItem = ({ product }: ProductItemProps): React.ReactNode => {
  const { brand, name, base_price, price, stock, seller } = product;
  const { loading: deleteLoading, callEndPoint } = useFetchAndLoad();
  // const { loading: editLoading, callEndPoint: editCallEndPoint } =
  //   useFetchAndLoad();
  const { token } = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const isSellerProduct = location.pathname === "/dashboard";
  const [fade, setFade] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);

  const handleDelete = async (productId: number) => {
    try {
      const response = await callEndPoint(deleteProduct(productId, token));
      const data = await response.data;
      // TODO: Toast(data.message)
      setFade(true);
      setTimeout(() => {
        setFade(false);
        dispatch(removeProduct({ isSellerProduct, productId }));
      }, 1000);
    } catch (error) {
      // TODO: Toast(error)
      console.log(error);
    }
  };

  const openEditForm = () => {
    setIsEditFormOpen(true);
  };

  const saveEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Save info in updateForm object
    // Validate info

    // Send info
    try {
      // const response = await editCallEndPoint(updateProduct(productId))
    } catch (error) {
      // TODO: Toast(error)
      console.log(error);
    }
  };

  return (
    <li className={`product ${fade ? "fade-animation" : ""}`}>
      <figure className="product__image-container">
        <img
          className="product__image"
          src={
            product.image_url
              ? `${API_URL}${product.image_url}`
              : noImagePlaceholder
          }
          alt={`${product.name} image`}
          width="260"
          onError={(e) => {
            (e.target as HTMLImageElement).src = noImagePlaceholder;
          }}
        />
      </figure>
      <p>{brand}</p>
      <p>{name}</p>
      <p>{price}</p>
      <p>{discount(+base_price, +price)}%</p>
      <p className="base-price">{base_price}</p>
      <p>Stock: {stock}</p>
      <p>{seller.username}</p>

      {isSellerProduct && (
        <>
          <Button
            className={deleteLoading ? "disabled" : ""}
            disabled={deleteLoading}
            onClick={() => handleDelete(product.id)}
          >
            {deleteLoading ? "Deleting" : "Delete"}
          </Button>
          <Button
            // className={editLoading ? "disabled" : ""}
            // disabled={editLoading}
            onClick={openEditForm}
          >
            Edit
          </Button>
        </>
      )}

      {isEditFormOpen && (
        <Modal>
          
        </Modal>
      )}
    </li>
  );
};
