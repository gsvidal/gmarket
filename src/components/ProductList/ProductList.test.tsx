import { render, screen } from "@testing-library/react";
import { ProductList } from ".";
import { Product } from "../../models";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

describe("ProductList", () => {
  it("should render 'Loading...' when loading is true", () => {
    const products: Product[] = [];
    const loading = true;
    const errorMessage = "";
    const totalPages = 3;
    const currentPage = 1;
    const productsPerPage = 5;

    render(
      <Provider store={store}>
        <ProductList
          products={products}
          loading={loading}
          errorMessage={errorMessage}
          totalPages={totalPages}
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          onChangePage={() => {}}
        />
      </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should render 'Product List is empty' when products.length is 0 and there's no error message", () => {
    const products: Product[] = [];
    const loading = false;
    const errorMessage = "";
    const totalPages = 3;
    const currentPage = 1;
    const productsPerPage = 5;

    render(
      <Provider store={store}>
        <ProductList
          products={products}
          loading={loading}
          errorMessage={errorMessage}
          totalPages={totalPages}
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          onChangePage={() => {}}
        />{" "}
      </Provider>
    );

    expect(screen.getByText(/product list is empty/i)).toBeInTheDocument();
  });

  it("should not render 'Product List is empty' when products.length is 0 and there's an error message", () => {
    const products: Product[] = [];
    const loading = false;
    const errorMessage = "Couldn't retrieve products. Error: Test error";
    const totalPages = 3;
    const currentPage = 1;
    const productsPerPage = 5;

    render(
      <Provider store={store}>
        <ProductList
          products={products}
          loading={loading}
          errorMessage={errorMessage}
          totalPages={totalPages}
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          onChangePage={() => {}}
        />
      </Provider>
    );

    expect(
      screen.queryByText(/product list is empty/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should render products names, base_prices, prices and sellers when products.length is not 0", () => {
    const products: Product[] = [
      {
        id: 1,
        name: "test product 1",
        brand: "test brand 1",
        description: "test description 1",
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
      },
      {
        id: 2,
        name: "test product 2",
        brand: "test brand 2",
        description: "test description 2",
        base_price: 399.99,
        price: 299.99,
        stock: 20,
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
      },
    ];
    const loading = false;
    const errorMessage = "";
    const totalPages = 3;
    const currentPage = 1;
    const productsPerPage = 5;

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductList
            products={products}
            loading={loading}
            errorMessage={errorMessage}
            totalPages={totalPages}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            onChangePage={() => {}}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/test product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test brand 1/i)).toBeInTheDocument();
    expect(screen.getByText(/249.99/)).toBeInTheDocument();
    expect(screen.getByText(/199.99/)).toBeInTheDocument();

    expect(screen.getByText(/test product 2/i)).toBeInTheDocument();
    expect(screen.getByText(/test brand 2/i)).toBeInTheDocument();
    expect(screen.getByText(/399.99/)).toBeInTheDocument();
    expect(screen.getByText(/299.99/)).toBeInTheDocument();

    expect(screen.getAllByText(/testUser/i)).toBeTruthy;
  });
});
