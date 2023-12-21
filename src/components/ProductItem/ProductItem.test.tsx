import { render, screen, waitFor } from "@testing-library/react";
import { ProductItem } from "./ProductItem";
import { Product } from "../../models";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import sinon from "sinon";
import { removeProduct } from "../../redux/states/product.slice";

describe("ProductItem", async () => {
  it("should render product details correctly", () => {
    const product: Product = {
      id: 1,
      name: "test product",
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
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductItem product={product} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/test product/i)).toBeInTheDocument();
    expect(screen.getByText(/test brand/i)).toBeInTheDocument();
    expect(screen.getByText("249.99")).toBeInTheDocument();
    expect(screen.getByText("199.99")).toBeInTheDocument();
    expect(screen.getByText(/stock: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/testUser/i)).toBeInTheDocument();
  });

  it("should render placeholder image when image_url is null", () => {
    const product: Product = {
      id: 1,
      name: "test product",
      brand: "test brand",
      description: "test description",
      base_price: 249.99,
      price: 199.99,
      stock: 10,
      image_url: null,
      category: {
        id: 1,
        name: "Test Category",
        code: "test-category",
      },
      seller: {
        id: 1,
        username: "testUser",
      },
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductItem product={product} />
        </BrowserRouter>
      </Provider>
    );

    const image = screen.getByAltText(
      /test product image/i
    ) as HTMLImageElement;
    expect(image.src).toContain("/images/no-image.png");
  });

  it("should render delete button for seller", () => {
    const product: Product = {
      id: 1,
      name: "test product",
      brand: "test brand",
      description: "test description",
      base_price: 249.99,
      price: 199.99,
      stock: 10,
      image_url: null,
      category: {
        id: 1,
        name: "Test Category",
        code: "test-category",
      },
      seller: {
        id: 1,
        username: "testUser",
      },
    };

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/dashboard"]}>
          <ProductItem product={product} />
        </MemoryRouter>
      </Provider>
    );
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it("should not show the delete button when the URL is not /dashboard", () => {
    const product: Product = {
      id: 1,
      name: "test product",
      brand: "test brand",
      description: "test description",
      base_price: 249.99,
      price: 199.99,
      stock: 10,
      image_url: null,
      category: {
        id: 1,
        name: "Test Category",
        code: "test-category",
      },
      seller: {
        id: 1,
        username: "testUser",
      },
    };

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <ProductItem product={product} />
        </MemoryRouter>
      </Provider>
    );

    // Check if the Delete button is rendered based on the /dashboard URL
    const deleteButton = screen.queryByRole("button", { name: /delete/i });

    expect(deleteButton).not.toBeInTheDocument();
  });

  it("should call handleDelete when delete button is clicked", async () => {
    const product: Product = {
      id: 1,
      name: "test product",
      brand: "test brand",
      description: "test description",
      base_price: 249.99,
      price: 199.99,
      stock: 10,
      image_url: null,
      category: {
        id: 1,
        name: "Test Category",
        code: "test-category",
      },
      seller: {
        id: 1,
        username: "testUser",
      },
    };

    const mockDispatch = sinon.stub(store, "dispatch");

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/dashboard"]}>
          <ProductItem product={product} />
        </MemoryRouter>
      </Provider>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });

    await userEvent.click(deleteButton);

    await waitFor(() => {
      sinon.assert.calledWith(
        mockDispatch,
        removeProduct({ isSellerProduct: true, productId: product.id })
      );
    });

    mockDispatch.restore();
  });
});
