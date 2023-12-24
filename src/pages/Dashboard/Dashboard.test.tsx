import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dashboard } from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { server } from "../../mocks/node";
import { HttpResponse, http } from "msw";
import { configureStore } from "@reduxjs/toolkit";
import sinon from "sinon";
import { addProduct, editProduct } from "../../redux/states/product.slice";
import { Product } from "../../models";
import { act } from "@testing-library/react";

const API_URL = import.meta.env.VITE_API_URL as string;

afterEach(() => {
  cleanup();
});

describe("Dashboard", () => {
  it("should render the dashboard title", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    const title = screen.getByText(/seller dashboard/i);
    expect(title).toBeInTheDocument();
  });

  it("should get products successfully", async () => {
    const store = configureStore({
      reducer: {
        user: () => ({ username: "testuser" }),
        product: () => ({
          sellerProducts: [
            {
              id: 1,
              name: "Product 1",
              brand: "Brand 1",
              description: "This is a description for Product 1",
              base_price: 249.99,
              price: 199.99,
              stock: 10,
              image: "image.png",
              category: {
                id: 1,
                name: "Category 1",
                code: "cat1",
              },
              seller: {
                id: 1,
                username: "testuser",
              },
            },
            {
              id: 2,
              name: "Product 2",
              brand: "Brand 2",
              description: "This is a description for Product 2",
              base_price: 349.99,
              price: 299.99,
              stock: 20,
              image: [],
              category: {
                id: 3,
                name: "Category 3",
                code: "cat3",
              },
              seller: {
                id: 1,
                username: "testuser",
              },
            },
          ],
        }),
      },
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
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

  it("should open product form when click on add product button", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    await userEvent.click(screen.getByRole("button", { name: /add product/i }));

    expect(await screen.findByText(/create a product/i)).toBeInTheDocument();

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

  it("should render a product after creating it", async () => {
    // Render the Dashboard component within the Redux provider
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );

    // Define the product to be added
    const newProduct = {
      id: 3,
      name: "Product 3",
      brand: "Brand 3",
      description: "This is a description for Product 3",
      base_price: 349.99,
      price: 299.99,
      stock: 20,
      image_url: "",
      category: {
        id: 3,
        name: "Category 3",
        code: "cat3",
      },
      seller: {
        id: 1,
        username: "testuser",
      },
    };

    // Dispatch the addProduct action
    await act(async () => {
      store.dispatch(
        addProduct({ isSellerProduct: true, product: newProduct })
      );
    });

    // Wait for the product's name to appear on the screen
    await waitFor(() => screen.getByText(/product 3/i));
    await waitFor(() => screen.getByText(/brand 3/i));
    await waitFor(() => screen.getByText(/349.99/i));
    await waitFor(() => screen.getByText(/299.99/i));
    await waitFor(() => screen.getByText(/stock: 20/i));
  });

  it("should render an edited product after editing it", async () => {
    // Render the Dashboard component within the Redux provider
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );

    // Define the product to be edited
    const productToEdit = {
      id: 3,
      name: "Product 3 edited",
      brand: "Brand 3",
      description: "This is a description for Product 3",
      base_price: 349.99,
      price: 299.99,
      stock: 20,
      image_url: "",
      category: {
        id: 3,
        name: "Category 3",
        code: "cat3",
      },
      seller: {
        id: 1,
        username: "testuser",
      },
    };

    // Dispatch the addProduct action
    await act(async () => {
      store.dispatch(
        editProduct({ isSellerProduct: true, productToEdit: productToEdit })
      );
    });

    // Wait for the product's name to appear on the screen
    await waitFor(() => screen.getByText(/product 3 edited/i));
    await waitFor(() => screen.getByText(/brand 3/i));
    await waitFor(() => screen.getByText(/349.99/i));
    await waitFor(() => screen.getByText(/299.99/i));
    await waitFor(() => screen.getByText(/stock: 20/i));
  });
});
