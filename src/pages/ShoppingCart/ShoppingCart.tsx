import { useSelector } from "react-redux";
import "./ShoppingCart.scss";
import { AppStore } from "../../redux/store";
import { CartProduct } from "../../models";
import noImagePlaceholder from "/images/no-image.png";
import {
  deleteProductFromCart,
  getAllProducts,
  updateProductQuantity,
} from "../../services/public.service";
import { useFetchAndLoad, useFetchProducts } from "../../hooks";
import { useDispatch } from "react-redux";
import { removeProductFromCart, updateProductCart } from "../../redux/states/cart.slice";
import { Button, Loader } from "../../components";
import { useEffect, useState } from "react";
import { formatPrice } from "../../helpers";
import { setToastNotification } from "../../redux/states/toastNotification.slice";

type ShoppingCartProps = {};

export const ShoppingCart = ({}: ShoppingCartProps): React.ReactNode => {
  const { cartItems } = useSelector((store: AppStore) => store.cart);
  const { token } = useSelector((store: AppStore) => store.user);
  const { loading, callEndPoint } = useFetchAndLoad();
  const [productIdToUpdate, setProductIdToUpdate] = useState<number | null>(
    null
  );
  const { loading: fetchProductsIsLoading, allProductIds } = useFetchProducts(
    () => getAllProducts(1, 10)
  );
  const [removedItemIds, setRemovedItemIds] = useState<number[]>([]);
  const {
    loading: deleteCartItemLoading,
    callEndPoint: callEndPointDeleteCartItem,
  } = useFetchAndLoad();

  const dispatch = useDispatch();
  const updateQuantity = async (productId: number, factor: number) => {
    setProductIdToUpdate(productId);
    try {
      const { data } = await callEndPoint(
        updateProductQuantity(productId, factor, token)
      );
      console.log(data)
      dispatch(updateProductCart({ productId, updatedQuantity: factor }));
    } catch (error) {
      console.log(error);
    }
  };

  const removedProducts = () => {
    const removedItems = cartItems.filter(
      (cartItem) =>
        !allProductIds.some((productId) => productId === cartItem.id)
    );
    const removedItemsIds = removedItems.map((items) => items.id);
    setRemovedItemIds(removedItemsIds);
  };

  useEffect(() => {
    if (allProductIds.length > 0) {
      removedProducts();
    }
  }, [allProductIds]);

  const handleDeleteCartItem = async (itemId: number) => {
    try {
      const { data } = await callEndPointDeleteCartItem(
        deleteProductFromCart(itemId, token)
      );
      // Deleted successfully
      dispatch(removeProductFromCart({productId: itemId}))
      dispatch(setToastNotification({message: data.message, type: "success"}))
    } catch (error: any) {
      dispatch(setToastNotification({message: error.error, type: "danger"}))
    }
  };

  return (
    <section className="shopping-cart">
      <h1>Shopping Cart</h1>
      { cartItems.length > 0 ? (
      <div className="items__container">
        {cartItems.map((cartItem: CartProduct) => (
          <div className={`item__container`} key={cartItem.id}>
            {loading && cartItem.id === productIdToUpdate && (
              <div className="item__disabled">
                <Loader size="medium" />
              </div>
            )}
            <img
              src={cartItem.image_url ? noImagePlaceholder : cartItem.image_url}
              alt={`${cartItem.name} image`}
              width="150"
              className="item__image"
            />
            <div className="item item__description">
              <p className="item__name">{cartItem.name}</p>
              <p className="item__brand">{cartItem.brand}</p>
              <p className="item__seller">{cartItem.seller.username}</p>
            </div>
            <p className="item item__price">{formatPrice(cartItem.price)}</p>
            <div className="quantity__container">
              <button
                className="button quantity__controller decrement"
                onClick={() => updateQuantity(cartItem.id, -1)}
                disabled={cartItem.quantity <= 1}
              >
                -
              </button>
              <p className="item item__quantity">{cartItem.quantity}</p>
              <button
                className="button quantity__controller increment"
                onClick={() => updateQuantity(cartItem.id, 1)}
                disabled={cartItem.quantity >= cartItem.stock}
              >
                +
              </button>
            </div>
            {cartItem.quantity === cartItem.stock && <p className="item__max-stock">Max. stock!</p>}
            {removedItemIds.includes(cartItem.id) && (
              <div className="item__disabled">
                <p className="item__removed-text">
                  The seller removed this product
                </p>
              </div>
            )}
            <Button
              className={`delete ${deleteCartItemLoading ? "disabled" : ""}`}
              disabled={deleteCartItemLoading}
              onClick={() => handleDeleteCartItem(cartItem.id)}
            >
              <span className="icon-item icon-item--delete"></span>
            </Button>
          </div>
        ))}
      </div>
      ) : (
        <p>Your shopping cart is empty, go to Home an add some products.</p>
      )}
    </section>
  );
};
