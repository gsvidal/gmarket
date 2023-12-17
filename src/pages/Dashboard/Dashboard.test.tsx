import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dashboard } from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { server } from "../../mocks/node";
import { HttpResponse, http } from "msw";

const API_URL = import.meta.env.VITE_API_URL as string;

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
    const productName = await screen.findByText(/^product 1$/i);
    const productBrand = await screen.findByText(/brand 1/i);
    const productBasePrice = await screen.findByText(/249.99/i);
    const productPrice = await screen.findByText(/199.99/i);
    const productStock = await screen.findByText(/stock: 10/i);
    expect(productName).toBeInTheDocument();
    expect(productBrand).toBeInTheDocument();
    expect(productBasePrice).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productStock).toBeInTheDocument();

    const productName2 = await screen.findByText(/^product 2$/i);
    const productBrand2 = await screen.findByText(/brand 2/i);
    const productBasePrice2 = await screen.findByText(/349.99/i);
    const productPrice2 = await screen.findByText(/299.99/i);
    const productStock2 = await screen.findByText(/stock: 20/i);
    expect(productName2).toBeInTheDocument();
    expect(productBrand2).toBeInTheDocument();
    expect(productBasePrice2).toBeInTheDocument();
    expect(productPrice2).toBeInTheDocument();
    expect(productStock2).toBeInTheDocument();
  });

  it("should open add product form when click on add product button", async () => {
    await userEvent.click(screen.getByRole("button", { name: /add product/i }));

    expect(
      await screen.findByText(/create a new product/i)
    ).toBeInTheDocument();

    expect(await screen.findByRole("form")).toBeInTheDocument();
  });

  it("should render error message if seller doesn't exist", async () => {
    server.use(
      http.get(`${API_URL}/seller_dashboard/:id`, () => {
        // Respond with "400 Bad Request" to "GET /seller_dashboard/:id" requests.
        return HttpResponse.json(
          { error: "Seller with provided ID does not exist" },
          { status: 400 }
        );
      })
    );

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    expect(
      await screen.findByText(/seller with provided ID does not exist/i)
    ).toBeInTheDocument();
  });
});
