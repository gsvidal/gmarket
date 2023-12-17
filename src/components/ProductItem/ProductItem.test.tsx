import { render, screen } from "@testing-library/react";
import { ProductItem } from "./ProductItem";
import { Product } from "../../models";

describe("ProductItem", () => {
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

    render(<ProductItem product={product} />);

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

    render(<ProductItem product={product} />);

    const image = screen.getByAltText(
      /test product image/i
    ) as HTMLImageElement;
    expect(image.src).toContain("/images/no-image.png");
  });
});
