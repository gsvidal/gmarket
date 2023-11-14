import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Register } from ".";

// AIM
// ACT
// ASSERT

beforeEach(() => {
  render(<Register />);
});

describe("Register", () => {
  it("should render form with inputs", () => {
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/^password$/i);
    const passwordConfirmationInput =
      screen.getByPlaceholderText(/confirm password/i);
    const sellerRadioElement = screen.getByLabelText(/seller/i);
    const customerRadioElement = screen.getByLabelText(/customer/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmationInput).toBeInTheDocument();
    expect(sellerRadioElement).toBeInTheDocument();
    expect(customerRadioElement).toBeInTheDocument();
  });
  it("should allows user to fill in the register form", () => {
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/^password$/i);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/confirm password/i);
    const sellerRadio = screen.getByLabelText(/seller/i);
    const customerRadio = screen.getByLabelText(/customer/i);

    fireEvent.change(usernameInput, { target: { value: "testUser" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "testPassword" },
    });
    fireEvent.click(sellerRadio);

    expect(usernameInput).toHaveValue("testUser");
    expect(passwordInput).toHaveValue("testPassword");
    expect(confirmPasswordInput).toHaveValue("testPassword");
    expect(sellerRadio).toBeChecked();
    expect(customerRadio).not.toBeChecked();
  });
});
