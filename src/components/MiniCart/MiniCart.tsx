import { NavLink } from "react-router-dom";
import { Button, Loader } from "..";
import "./MiniCart.scss";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import noImagePlaceholder from "/images/no-image.png";
import { PublicRoutes } from "../../models";
import closeIcon from "/icons/close.svg";

type MiniCartProps = {
  getCartLoading: boolean;
  setIsMiniCartOpen: (bool: boolean) => void;
};

export const MiniCart = ({
  getCartLoading,
  setIsMiniCartOpen,
}: MiniCartProps): React.ReactNode => {
  const { cartItems, cartTotalPrice } = useSelector(
    (store: AppStore) => store.cart
  );
  // console.log(cartItems)
  const handleCloseMiniCart = () => {
    setIsMiniCartOpen(false);
  };
  return (
    <section className="mini-cart">
      <h2 className="mini-cart__title">MiniCart</h2>
      <img
        className="close-icon"
        src={closeIcon}
        alt={`close icon`}
        onClick={handleCloseMiniCart}
      />
      <div className="items__container">
        {getCartLoading ? (
          <Loader size="small" />
        ) : (
          <>
            {cartItems.length > 0 ? (
              cartItems.map((cartItem) => (
                <div className="item__container" key={cartItem.id}>
                  <img
                    className="item__image"
                    src={
                      cartItem.image_url
                        ? noImagePlaceholder
                        : cartItem.image_url
                    }
                    alt={`${cartItem.name} image`}
                  />
                  <p className="item__name">
                    {cartItem.name.length < 9
                      ? cartItem.name
                      : cartItem.name.substring(0, 8) + "..."}
                  </p>
                  <p className="item__description">
                    <span className="item__quantity">{cartItem.quantity}</span>
                    {"  x  "}
                    <span className="item__price">$ {cartItem.price}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="item__container empty">Your cart is empty</p>
            )}
          </>
        )}
      </div>
      <p className="total__price">Total price: $ {cartTotalPrice}</p>
      <Button onClick={handleCloseMiniCart} className="minicart">
        <NavLink to={PublicRoutes.CART}>Continue</NavLink>
      </Button>
    </section>
  );
};
