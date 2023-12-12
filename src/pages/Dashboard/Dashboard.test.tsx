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
  it("should render the dashboard title", async () => {
    const title = screen.getByText(/seller dashboard/i);
    expect(title).toBeInTheDocument();
  });

  it("should get products successfully", async () => {
    const productName = await screen.findByText(/product 1/i);
    const productDescription = await screen.findByText(
      /This is a description for Product 1/i
    );
    const productPrice = await screen.findByText(/199.99/i);
    const productStock = await screen.findByText(/10/i);
    expect(productName).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productStock).toBeInTheDocument();

    const productName2 = await screen.findByText(/product 2/i);
    const productDescription2 = await screen.findByText(
      /This is a description for Product 2/i
    );
    const productPrice2 = await screen.findByText(/199.99/i);
    const productStock2 = await screen.findByText(/20/i);
    expect(productName2).toBeInTheDocument();
    expect(productDescription2).toBeInTheDocument();
    expect(productPrice2).toBeInTheDocument();
    expect(productStock2).toBeInTheDocument();
  });

  it("should open add product form when click on add product button", async () => {
    await userEvent.click(screen.getByRole("button", { name: /add product/i }));
    
    expect(await screen.findByText(/create a new product/i)).toBeInTheDocument();

    expect(await screen.findByRole("form")).toBeInTheDocument();
  });
});
