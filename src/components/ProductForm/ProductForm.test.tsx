import { describe, it, beforeEach, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductForm } from ".";
import sinon from "sinon";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Product } from "../../models";

// For create product

const clickCreateProduct = async () => {
  await userEvent.click(screen.getByRole("button", { name: /create/i }));
};

describe("ProductForm when used to create a product", () => {
  beforeEach(() => {
    const mockSetIsModalOpen = sinon.stub();
    const mockType = "create" || "update";
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductForm setIsModalOpen={mockSetIsModalOpen} type={mockType} />
        </Provider>
      </BrowserRouter>
    );
  });

  it("should renders all input fields and the select dropdown", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/brand/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/base price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/stock/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  it("should allow entering text into the input fields", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "Product 1");
    expect(screen.getByLabelText(/name/i)).toHaveValue("Product 1");

    await userEvent.type(screen.getByLabelText(/brand/i), "Brand 1");
    expect(screen.getByLabelText(/brand/i)).toHaveValue("Brand 1");

    await userEvent.type(
      screen.getByLabelText(/description/i),
      "This is a description for Product 1"
    );
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      "This is a description for Product 1"
    );

    await userEvent.type(screen.getByLabelText(/base price/i), "149.99");
    expect(screen.getByLabelText(/base price/i)).toHaveValue("149.99");

    await userEvent.type(screen.getByLabelText(/^price/i), "99.99");
    expect(screen.getByLabelText(/^price/i)).toHaveValue("99.99");

    await userEvent.type(screen.getByLabelText(/stock/i), "10");
    expect(screen.getByLabelText(/stock/i)).toHaveValue(10);
  });

  it("should allow selecting an option from the category dropdown", async () => {
    // Wait for the "Technology" option to be fetched and added to the DOM
    await screen.findByRole("option", { name: "Technology" });

    // Now you can interact with the select element
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /category/i }),
      ["Technology"]
    );
    expect(screen.getByRole("combobox", { name: /category/i })).toHaveValue(
      "tech"
    );
  });

  it("should show the product name input error message when trying to add a product without a name", async () => {
    await clickCreateProduct();
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  });

  it("should show the product brand input error message when trying to add a product without a description", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "productTest");

    await clickCreateProduct();

    expect(await screen.findByText(/brand is required/i)).toBeInTheDocument();
  });

  it("should show the product description input error message when trying to add a product without a description", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");

    await clickCreateProduct();
    expect(
      await screen.findByText(/description is required/i)
    ).toBeInTheDocument();
  });

  it("should show the product base price input error message when trying to add a product without a base price", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );

    await clickCreateProduct();
    expect(
      await screen.findByText(/base price is required/i)
    ).toBeInTheDocument();
  });

  it("should show the product price input error message when trying to add a product without a price", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );
    await userEvent.type(screen.getByLabelText(/base price/i), "199");

    await clickCreateProduct();
    expect(await screen.findByText(/price is required/i)).toBeInTheDocument();
  });

  it("should show the product stock input error message when trying to add a product without a stock", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );
    await userEvent.type(screen.getByLabelText(/base price/i), "199");
    await userEvent.type(screen.getByLabelText(/^price/i), "99");

    await clickCreateProduct();
    expect(await screen.findByText(/stock is required/i)).toBeInTheDocument();
  });

  it("should show base price error if filled base price is a string, after adding product name, description and stock", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );
    await userEvent.type(
      screen.getByLabelText(/base price/i),
      "ciento noventa y nueve"
    );
    await userEvent.type(screen.getByLabelText(/^price/i), "149");
    await userEvent.type(screen.getByLabelText(/stock/i), "10");
    await clickCreateProduct();
    expect(
      await screen.findByText(/base price must be a positive number/i)
    ).toBeInTheDocument();
  });

  it("should show price error if filled price is a string, after adding product name, description, base price and stock", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );
    await userEvent.type(screen.getByLabelText(/base price/i), "199");
    await userEvent.type(
      screen.getByLabelText(/^price/i),
      "ciento cuarenta y nueve"
    );
    await userEvent.type(screen.getByLabelText(/stock/i), "10");
    await clickCreateProduct();
    expect(
      await screen.findByText(/price must be a positive number/i)
    ).toBeInTheDocument();
  });

  it("should show price error if filled price is not a positive number, after adding product name, description and stock", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );
    await userEvent.type(screen.getByLabelText(/base price/i), "199");
    await userEvent.type(screen.getByLabelText(/^price/i), "-99");
    await userEvent.type(screen.getByLabelText(/stock/i), "10");
    await clickCreateProduct();
    expect(
      await screen.findByText(/price must be a positive number/i)
    ).toBeInTheDocument();
  });

  it("should show stock error if filled stock is not an integer, after adding product name, description and price", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );
    await userEvent.type(screen.getByLabelText(/base price/i), "199");
    await userEvent.type(screen.getByLabelText(/^price/i), "99");
    await userEvent.type(screen.getByLabelText(/stock/i), "10.5");
    await clickCreateProduct();
    expect(
      await screen.findByText(/stock must be a positive integer/i)
    ).toBeInTheDocument();
  });

  it("should show stock error if filled stock is not positive integer, after adding product name, description and price", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );
    await userEvent.type(screen.getByLabelText(/base price/i), "199");
    await userEvent.type(screen.getByLabelText(/^price/i), "99");
    await userEvent.type(screen.getByLabelText(/stock/i), "-10");
    await clickCreateProduct();
    expect(
      await screen.findByText(/stock must be a positive integer/i)
    ).toBeInTheDocument();
  });

  it("should show an file error message if a not jpg, jpeg, png is tried to be uploaded", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );
    await userEvent.type(screen.getByLabelText(/base price/i), "199");
    await userEvent.type(screen.getByLabelText(/^price/i), "99");
    await userEvent.type(screen.getByLabelText(/stock/i), "10");

    const file = new File(["(⌐□_□)"], "chucknorris.gif", { type: "image/gif" });
    const input = screen.getByLabelText(/image/i);
    await userEvent.upload(input, file);

    expect(
      screen.getByText(/please upload a valid image file: jpg\/jpeg\/png./i)
    ).toBeInTheDocument();
  });

  it("should not show an file error message if uploaded file has a jpg, jpeg, png extension", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );
    await userEvent.type(screen.getByLabelText(/base price/i), "199");
    await userEvent.type(screen.getByLabelText(/^price/i), "99");
    await userEvent.type(screen.getByLabelText(/stock/i), "10");

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const input = screen.getByLabelText(/image/i);
    await userEvent.upload(input, file);

    expect(
      screen.queryByText(/please upload a valid image file: jpg\/jpeg\/png./i)
    ).not.toBeInTheDocument();
  });

  it("should show an file size error message if uploaded file size is greater than or equal to 2MB", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );
    await userEvent.type(screen.getByLabelText(/base price/i), "199");
    await userEvent.type(screen.getByLabelText(/^price/i), "99");
    await userEvent.type(screen.getByLabelText(/stock/i), "10");

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 3 * 1024 * 1024 });
    const input = screen.getByLabelText(/image/i);
    await userEvent.upload(input, file);

    await clickCreateProduct();

    // Check if the file size error message is displayed
    expect(
      await screen.findByText(/image size must be less than or equal to 2MB/i)
    ).toBeInTheDocument();
  });
});

// For create a product
describe("ProductForm", () => {
  beforeEach(() => {
    const mockSetIsModalOpen = sinon.stub();
    const mockType = "create";

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductForm setIsModalOpen={mockSetIsModalOpen} type={mockType} />
        </Provider>
      </BrowserRouter>
    );
  });

  // it("should render correct title when creating a product", () => {
  //   expect(screen.getByText(/create a product/i)).toBeInTheDocument();
  // });

  it("should not render the component after creating a product", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "product 1");
    await userEvent.type(screen.getByLabelText(/brand/i), "brand 1");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "product 1 description"
    );
    await userEvent.type(screen.getByLabelText(/base price/i), "199");
    await userEvent.type(screen.getByLabelText(/^price/i), "99");
    await userEvent.type(screen.getByLabelText(/stock/i), "10");

    await clickCreateProduct();

    screen.debug();

    await waitFor(() => {
      expect(screen.queryByText(/create a product/i)).not.toBeInTheDocument();
    });
  });
});

describe("ProductForm", () => {
  beforeEach(() => {
    const mockSetIsModalOpen = sinon.stub();
    const mockType = "update";
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
      <BrowserRouter>
        <Provider store={store}>
          <ProductForm
            setIsModalOpen={mockSetIsModalOpen}
            type={mockType}
            product={product}
          />
        </Provider>
      </BrowserRouter>
    );
  });

  it("should render correct title when editing", () => {
    expect(screen.getByText(/edit a product/i)).toBeInTheDocument();
  });
});
