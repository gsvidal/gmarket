import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dashboard } from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </BrowserRouter>
  );
});

describe("Dashboard", () => {
  it("should get products successfully", () => {
    const productName = screen.findByText(/product 1/i);
    const productDescription = screen.findByText(/This is a description for Product 1/i);
    const productPrice = screen.findByText(/99.99/i);
    const productStock = screen.findByText(/10/i);
    expect(productName).toBeInTheDocument()
    expect(productDescription).toBeInTheDocument()
    expect(productPrice).toBeInTheDocument()
    expect(productStock).toBeInTheDocument()
  });
});
