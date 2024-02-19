import { useSelector } from "react-redux";
import { useFetchAndLoad } from "../../hooks";
import { Product } from "../../models";
import { deleteProduct } from "../../services/public.service";
import "./ProductItem.scss";
import noImagePlaceholder from "/images/no-image.png";
import { useLocation } from "react-router-dom";
import { AppStore } from "../../redux/store";
import { removeProduct } from "../../redux/states/product.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ProductForm, Button, Modal } from "..";
import { setToastNotification } from "../../redux/states/toastNotification.slice";
import { addProductToCart } from "../../redux/states/cart.slice";

type ProductItemProps = {
  product: Product;
};

const discount = (base: number, price: number) => {
  const discount = ((price - base) / base) * 100;
  return discount.toFixed(2);
};

export const ProductItem = ({ product }: ProductItemProps): React.ReactNode => {
  const { brand, name, base_price, price, stock, seller } = product;
  const { loading: deleteLoading, callEndPoint } = useFetchAndLoad();
  const { id, role, token } = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const isDashboardProduct = location.pathname === "/dashboard";
  const [fade, setFade] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const isUserCustomer = role === "Customer";

  const handleDelete = async (productId: number) => {
    try {
      const response = await callEndPoint(deleteProduct(productId, token));
      const data = await response.data;

      setFade(true);
      setTimeout(() => {
        setFade(false);
        dispatch(removeProduct({ isDashboardProduct, productId }));
      }, 1000);
      dispatch(
        setToastNotification({ message: data.message, type: "success" })
      );
    } catch (error: any) {
      dispatch(
        setToastNotification({ message: error.message, type: "danger" })
      );
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const openEditForm = () => {
    setIsEditModalOpen(true);
  };

  const handleAddToCart = () => {
    console.log("product to add: ", product);
    dispatch(addProductToCart({ isUserCustomer, product }));
    
  };

  return (
    <>
      <li className={`product ${fade ? "fade-animation" : ""}`}>
        <figure className="product__image-container">
          <img
            className="product__image"
            src={product.image_url ? product.image_url : noImagePlaceholder}
            alt={`${product.name} image`}
            width="260"
            onError={(e) => {
              (e.target as HTMLImageElement).src = noImagePlaceholder;
            }}
          />
        </figure>
        <div className="product__info">
          <p>{brand}</p>
          <p className="product__name">{name}</p>
          <p>$ {price}</p>
          <p className="product__discount">{discount(+base_price, +price)}%</p>
          <p className="product__base-price">$ {base_price}</p>
          <p className="product__stock">Stock: {stock}</p>
          <p className="product__seller">Seller: {seller.username}</p>
        </div>

        <div className="product__buttons-container">
          {isDashboardProduct ? (
            <>
              <Button onClick={openEditForm} className="edit">
                Edit <span className="icon-item icon-item--edit"></span>
              </Button>
              <Button
                className={`delete ${deleteLoading ? "disabled" : ""}`}
                disabled={deleteLoading}
                onClick={handleDeleteModal}
              >
                {deleteLoading ? "Deleting" : "Delete"}{" "}
                <span className="icon-item icon-item--delete"></span>
              </Button>
            </>
          ) : (
            id !== seller.id &&
            role === "Customer" && (
              <Button className="add" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            )
          )}
        </div>

        {isEditModalOpen && (
          <Modal onClose={() => setIsEditModalOpen(false)}>
            <ProductForm
              setIsModalOpen={setIsEditModalOpen}
              type="update"
              product={product}
            />
          </Modal>
        )}
      </li>

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <div className="delete-modal glassy border">
            <h3>Are you sure you want to delete this product?</h3>
            <div className="delete-modal__buttons-container">
              <div className="buttons-container">
                <Button onClick={() => setIsDeleteModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className={`delete ${deleteLoading ? "disabled" : ""}`}
                  disabled={deleteLoading}
                  onClick={() => handleDelete(product.id)}
                >
                  {deleteLoading ? "Deleting" : "Confirm"}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
