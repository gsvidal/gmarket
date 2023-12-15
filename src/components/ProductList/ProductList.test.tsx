import { render, screen } from "@testing-library/react";
import { ProductList } from ".";
import { Product } from "../../models";


describe("ProductList", () => {
  it("should render 'Loading...' when loading is true", () => {
    const products: Product[] = [];
    const loading = true;
    const errorMessage = "";

    render(
      <ProductList
        products={products}
        loading={loading}
        errorMessage={errorMessage}
      />
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("should render 'Product List is empty' when products.length is 0 and there's no error message", () => {
    const products: Product[] = [];
    const loading = false;
    const errorMessage = "";

    render(
      <ProductList
        products={products}
        loading={loading}
        errorMessage={errorMessage}
      />
    );

    expect(screen.getByText(/product list is empty/i)).toBeInTheDocument();
  });

  it("should not render 'Product List is empty' when products.length is 0 and there's an error message", () => {
    const products: Product[] = [];
    const loading = false;
    const errorMessage = "Couldn't retrieve products. Error: Test error";

    render(
      <ProductList
        products={products}
        loading={loading}
        errorMessage={errorMessage}
      />
    );

    expect(
      screen.queryByText(/product list is empty/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should render product list name, price and seller when products.length is not 0", () => {
    const products: Product[] = [
      {
        id: 1,
        name: "test product 1",
        description: "test description 1",
        price: 199.99,
        stock: 10,
        image_url:  "image.png",
        category: [],
        seller: {
          id: 1,
          username: "testUser",
          role: "Seller",
          creationDate: "2021-08-31T14:00:00.000Z",
          token: "testToken",
        },
      },
      {
        id: 2,
        name: "test product 2",
        description: "test description 2",
        price: 299.99,
        stock: 20,
        image_url: "image.png",
        category: [],
        seller: {
          id: 1,
          username: "testUser",
          role: "Seller",
          creationDate: "2021-08-31T14:00:00.000Z",
          token: "testToken",
        },
      },
    ];
    const loading = false;
    const errorMessage = "";

    render(
      <ProductList
        products={products}
        loading={loading}
        errorMessage={errorMessage}
      />
    );

    expect(screen.getByText(/test product 1/i)).toBeInTheDocument();
    expect(screen.getByText("199.99")).toBeInTheDocument();
    expect(screen.getAllByText(/testUser/i)).toBeTruthy;
    
    expect(screen.getByText(/test product 2/i)).toBeInTheDocument();
    expect(screen.getByText("299.99")).toBeInTheDocument();

  });
});
