import { NavLink } from "react-router-dom";
import { Button } from "..";
import "./MiniCart.scss";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import noImagePlaceholder from "/images/no-image.png";

type MiniCartProps = {};

export const MiniCart = ({}: MiniCartProps): React.ReactNode => {
  const { cartItems } = useSelector((store: AppStore) => store.cart);
  console.log("cart: ", cartItems);
  const handleContinue = () => {};
  return (
    <section className="mini-cart">
      <h2 className="mini-cart__title">MiniCart</h2>
      <div className="items__container">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <div className="item__container">
              <img
                className="item__image"
                src={
                  cartItem.image_url ? noImagePlaceholder : cartItem.image_url
                }
                alt={`${cartItem.name} image`}
              />
              <p className="item__name">{cartItem.name}</p>
              <p className="item__description">
                <span className="item__quantity">{cartItem.stock}</span>
                {"  x  "}
                <span className="item__price">$ {cartItem.price}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="item__container empty">Your cart is empty</p>
        )}
      </div>
      <Button onClick={handleContinue} className="minicart">
        <NavLink to={"/shopping-cart"}>Continue</NavLink>
      </Button>
    </section>
  );
};
