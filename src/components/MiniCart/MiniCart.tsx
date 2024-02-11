import { NavLink } from "react-router-dom";
import { Button } from "..";
import "./MiniCart.scss";

type MiniCartProps = {};

export const MiniCart = ({}: MiniCartProps): React.ReactNode => {
  const handleContinue = () => {};
  return (
    <div className="mini-cart">
      <h2>MiniCart</h2>
      {/* Items List */}
      <div className="item__container">
        <img className="item__image" src="" alt="Item 1 image" />
        <p>
          <span className="item__quantity">2</span>
          {" x "}
          <span className="item__name">Item 1</span>
        </p>
      </div>
      <Button onClick={handleContinue}>
        <NavLink to={"/shopping-cart"}>Continue</NavLink>
      </Button>
    </div>
  );
};
