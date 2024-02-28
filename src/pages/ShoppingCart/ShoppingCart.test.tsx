import { render, screen } from "@testing-library/react";
import { ShoppingCart } from ".";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    </BrowserRouter>
  );
});

describe("ShoppingCart", () => {
  it("renders correctly", () => {
    expect(
      screen.getByRole("heading", { name: /Shopping Cart/i })
    ).toBeInTheDocument();
  });
});
