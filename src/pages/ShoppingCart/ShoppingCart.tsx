import { useSelector } from "react-redux";
import "./ShoppingCart.scss";
import { AppStore } from "../../redux/store";
import { CartProduct } from "../../models";
import noImagePlaceholder from "/images/no-image.png";
import { updateProductQuantity } from "../../services/public.service";
import { useFetchAndLoad } from "../../hooks";
import { useDispatch } from "react-redux";
import { updateProductCart } from "../../redux/states/cart.slice";
import { Loader } from "../../components";

type ShoppingCartProps = {};

export const ShoppingCart = ({}: ShoppingCartProps): React.ReactNode => {
  const { cartItems } = useSelector((store: AppStore) => store.cart);
  const { token } = useSelector((store: AppStore) => store.user);
  const { loading, callEndPoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const updateQuantity = async (productId: number, factor: number) => {
    try {
      const response = await callEndPoint(
        updateProductQuantity(productId, factor, token)
      );
      console.log(response);
      dispatch(updateProductCart({ productId, updatedQuantity: factor }));
    } catch (error) {
      console.log(error);
    }
  };

  const formatPrice = (price: number) => {
    return price % price === 0 ? `${price}.00` : price;
  };
  return (
    <section className="shopping-cart">
      <h1>Shopping Cart</h1>
      <div className="items__container">
        {cartItems.map((cartItem: CartProduct) => (
          <div className={`item__container`} key={cartItem.id}>
            {loading && (
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
            <p className="item item__price">$ {formatPrice(cartItem.price)}</p>
            <div className="quantity__container">
              <button
                className="button quantity__controller decrement"
                onClick={() => updateQuantity(cartItem.id, -1)}
              >
                -
              </button>
              <p className="item item__quantity">{cartItem.quantity}</p>
              <button
                className="button quantity__controller increment"
                onClick={() => updateQuantity(cartItem.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
