import { describe, it, beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddProductForm } from ".";

describe("AddProductForm", () => {
  beforeEach(() => {
    render(<AddProductForm />);
  });

  it("renders all input fields and the select dropdown", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/stock/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  it("allows entering text into the input fields", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "Product 1");
    expect(screen.getByLabelText(/name/i)).toHaveValue("Product 1");

    await userEvent.type(
      screen.getByLabelText(/description/i),
      "This is a description for Product 1"
    );
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      "This is a description for Product 1"
    );

    await userEvent.type(screen.getByLabelText(/price/i), "99.99");
    expect(screen.getByLabelText(/price/i)).toHaveValue("99.99");

    await userEvent.type(screen.getByLabelText(/stock/i), "10");
    expect(screen.getByLabelText(/stock/i)).toHaveValue(10);
  });

  it("allows selecting an option from the category dropdown", async () => {
    await userEvent.selectOptions(screen.getByLabelText(/category/i), "technology");
    expect(screen.getByLabelText(/category/i)).toHaveValue("technology");
  });
});
