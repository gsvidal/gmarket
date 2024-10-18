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
import {
  removeProductFromCart,
  updateProductCart,
} from "../../redux/states/cart.slice";
import { Button, Input, Loader } from "../../components";
import { useEffect, useState } from "react";
import { setToastNotification } from "../../redux/states/toastNotification.slice";
import { formatPrice } from "../../helpers";

type ShoppingCartProps = {};

export const ShoppingCart = ({}: ShoppingCartProps): React.ReactNode => {
  const { cartItems, cartTotalPrice } = useSelector(
    (store: AppStore) => store.cart
  );
  const { token } = useSelector((store: AppStore) => store.user);
  const { loading: updateLoading, callEndPoint: callEndPointUpdate } =
    useFetchAndLoad();
  const { loading: deleteLoading, callEndPoint: callEndPointDelete } =
    useFetchAndLoad();
  const [cartItemIdToUpdate, setCartItemIdToUpdate] = useState<number | null>(
    null
  );
  const [cartItemIdToDelete, setCartItemIdToDelete] = useState<number | null>(
    null
  );
  const { allProductIds } = useFetchProducts(() => getAllProducts(1, 10));
  const [removedItemIds, setRemovedItemIds] = useState<number[]>([]);

  const dispatch = useDispatch();
  const updateQuantity = async (productId: number, factor: number) => {
    setCartItemIdToUpdate(productId);
    try {
      await callEndPointUpdate(
        updateProductQuantity(productId, factor, token)
      );
      dispatch(updateProductCart({ productId, updatedQuantity: factor }));
    } catch (error: any) {
      dispatch(setToastNotification({ message: error.message, type: "danger" }));
    }
  };

  const removedProductsFromSeller = () => {
    const removedItems = cartItems.filter(
      (cartItem) =>
        !allProductIds.some((productId) => productId === cartItem.id)
    );
    const removedItemsIds = removedItems.map((items) => items.id);
    setRemovedItemIds(removedItemsIds);
  };

  useEffect(() => {
    if (allProductIds.length > 0) {
      removedProductsFromSeller();
    }
  }, [allProductIds]);

  const handleDeleteCartItem = async (itemId: number) => {
    setCartItemIdToDelete(itemId);
    try {
      const { data } = await callEndPointDelete(
        deleteProductFromCart(itemId, token)
      );
      // Deleted successfully
      dispatch(removeProductFromCart({ productId: itemId }));
      dispatch(
        setToastNotification({ message: data.message, type: "success" })
      );
    } catch (error: any) {
      dispatch(setToastNotification({ message: error.message, type: "danger" }));
    }
  };

  const isCartItemLoading = (cartItem: CartProduct) => {
    return (
      (updateLoading && cartItem.id === cartItemIdToUpdate) ||
      (deleteLoading && cartItem.id === cartItemIdToDelete)
    );
  };

  return (
    <section className="shopping-cart">
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="shopping-cart__container">
          <div className="items__container">
            {cartItems.map((cartItem: CartProduct) => (
              <div className={`item__container`} key={cartItem.id}>
                {isCartItemLoading(cartItem) && (
                  <div className="item__disabled">
                    <Loader size="medium" />
                  </div>
                )}
                <img
                  src={
                    cartItem.image_url ? cartItem.image_url : noImagePlaceholder
                  }
                  alt={`${cartItem.name} image`}
                  width="150"
                  className="item__image"
                />
                <div className="item item__description">
                  <p className="item__name">{cartItem.name}</p>
                  <p className="item__brand">{cartItem.brand}</p>
                  <p className="item__seller">{cartItem.seller.username}</p>
                </div>
                <p className="item item__price">
                  {formatPrice(cartItem.price)}
                </p>
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
                {cartItem.quantity === cartItem.stock && (
                  <p className="item__max-stock">Max. stock!</p>
                )}
                {removedItemIds.includes(cartItem.id) && (
                  <div className="item__disabled">
                    <p className="item__removed-text">
                      The seller removed this product
                    </p>
                  </div>
                )}
                <Button
                  className={`delete ${deleteLoading ? "disabled" : ""}`}
                  onClick={() => handleDeleteCartItem(cartItem.id)}
                >
                  <span className="icon-item icon-item--delete"></span>
                </Button>
              </div>
            ))}
          </div>
          <aside className="item__costs">
            <div className="item__container item__cost sub-total">
              <p>Subtotal:</p>
              <p>{formatPrice(cartTotalPrice)}</p>
            </div>
            <div className="item__container item__cost ship-cost">
              <p>Shipping:</p>
              <p>{formatPrice(30)}</p>
            </div>
            <div className="item__container item__cost promo-code">
              <Input type="text" placeholder="GMARKET30" labelText="Promo Code" name="promo-code"/>
            </div>
          </aside>
        </div>
      ) : (
        <p>Your shopping cart is empty, go to Home an add some products.</p>
      )}
    </section>
  );
};
