import { render, screen } from "@testing-library/react";
import { MiniCart } from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { CartProduct } from "../../models";
import { cartReducer } from "../../redux/states";

const mockCartItems: CartProduct[] = [
  {
    id: 1,
    name: "test product 1",
    brand: "test brand",
    description: "test description",
    base_price: 249.99,
    price: 199.99,
    stock: 10,
    image_url: "image.png",
    category: {
      id: 1,
      name: "Test Category",
      code: "test-category",
    },
    seller: {
      id: 1,
      username: "testUser",
    },
    quantity: 1,
  },
  {
    id: 2,
    name: "test product 2",
    brand: "test brand",
    description: "test description",
    base_price: 349.99,
    price: 499.99,
    stock: 14,
    image_url: "image.png",
    category: {
      id: 1,
      name: "Test Category",
      code: "test-category",
    },
    seller: {
      id: 1,
      username: "testUser",
    },
    quantity: 2,
  },
];

const expectedTotalPrice = 199.99 + 499.99 * 2;
console.log(expectedTotalPrice)
console.log(expectedTotalPrice.toFixed(2))

const store = configureStore({
  reducer: {
    cart: cartReducer // Assuming you have a slice or reducer named 'cart'
  },
  preloadedState: {
    cart: {
      cartItems: mockCartItems,
      cartTotalQuantity: 2,
      cartTotalPrice: expectedTotalPrice,
    }
  }
});

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MiniCart getCartLoading={false} setIsMiniCartOpen={() => {}} />
      </Provider>
    </BrowserRouter>
  );
});

describe("MiniCart", () => {
  it("renders correctly", () => {
    expect(screen.getByText(/MiniCart/i)).toBeInTheDocument();
  });
  it("renders the name of each cart item", () => {
    expect(screen.getByText(/test product 1/i)).toBeInTheDocument()
    expect(screen.getByText(/test product 2/i)).toBeInTheDocument()
  })
  it("renders the quantity of each cart item", () => {
    expect(screen.getByText(1)).toBeInTheDocument()
    expect(screen.getByText(2)).toBeInTheDocument()
  })
  it("renders the price of each cart item", () => {
    expect(screen.getByText(199.99)).toBeInTheDocument()
    expect(screen.getByText(499.99)).toBeInTheDocument()
  })
  it("renders total price of the cart", () => {
    expect(screen.getByText(/total price/i)).toBeInTheDocument()
    expect(screen.getByText(1199.97)).toBeInTheDocument()
    screen.debug()
  })
});
