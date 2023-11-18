import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Register } from ".";

beforeEach(() => {
  render(<Register />);
});

describe("Register", () => {
  type CheckError = {
    username: HTMLElement | null;
    password: HTMLElement | null;
    confirmPassword: HTMLElement | null;
    passwordLength: HTMLElement | null;
    passwordsDontMatch: HTMLElement | null;
    role: HTMLElement | null;
  };

  type FormElements = {
    registerTitle: HTMLElement;
    usernameInput: HTMLElement;
    passwordInput: HTMLElement;
    confirmPasswordInput: HTMLElement;
    sellerRadio: HTMLElement;
    customerRadio: HTMLElement;
    submitButton: HTMLElement;
  };

  const checkError = (): CheckError => {
    return {
      username: screen.queryByText(/username is required/i),
      password: screen.queryByText(/^password is required$/i),
      confirmPassword: screen.queryByText(/confirm password is required/i),
      passwordLength: screen.queryByText(
        /password must be at least 6 characters long/i
      ),
      passwordsDontMatch: screen.queryByText(/passwords do not match/i),
      role: screen.queryByText(/role is required/i),
    };
  };

  const getFormElement = (): FormElements => ({
    registerTitle: screen.getByRole("heading", {
      name: /register form/i,
    }),
    usernameInput: screen.getByPlaceholderText(/username/i),
    passwordInput: screen.getByPlaceholderText(/^password$/i),
    confirmPasswordInput: screen.getByPlaceholderText(/confirm password/i),
    sellerRadio: screen.getByLabelText(/seller/i),
    customerRadio: screen.getByLabelText(/customer/i),
    submitButton: screen.getByRole("button", { name: /register/i }),
  });

  const clickSubmitButton = async () => {
    await userEvent.click(getFormElement().submitButton);
  };

  const fillInput = async (inputElement: HTMLElement, content: string) => {
    await userEvent.type(inputElement, content);
  };

  it("should render form title", () => {
    expect(getFormElement().registerTitle).toBeInTheDocument();
  });
  it("should render form inputs", () => {
    expect(getFormElement().usernameInput).toBeInTheDocument();
    expect(getFormElement().passwordInput).toBeInTheDocument();
    expect(getFormElement().confirmPasswordInput).toBeInTheDocument();
    expect(getFormElement().sellerRadio).toBeInTheDocument();
    expect(getFormElement().customerRadio).toBeInTheDocument();
    expect(getFormElement().submitButton).toBeInTheDocument();
  });

  it("should allows user to fill in the register form", async () => {
    await fillInput(getFormElement().usernameInput, "testUser");
    expect(getFormElement().usernameInput).toHaveValue("testUser");

    await fillInput(getFormElement().passwordInput, "testPassword");
    expect(getFormElement().passwordInput).toHaveValue("testPassword");

    await fillInput(getFormElement().confirmPasswordInput, "testPassword");
    expect(getFormElement().confirmPasswordInput).toHaveValue("testPassword");

    await userEvent.click(getFormElement().sellerRadio);

    expect(getFormElement().sellerRadio).toBeChecked();
    expect(getFormElement().customerRadio).not.toBeChecked();
  });

  // Client validation

  it("should display error messages for empty username field", async () => {
    expect(checkError().username).not.toBeInTheDocument();
    // Attempt to submit with empty fields
    await clickSubmitButton();

    // Check if the error message for empty username is displayed
    expect(checkError().username).toBeInTheDocument();

    // Only Filling in username field and submitting
    await fillInput(getFormElement().usernameInput, "testUser");
    await clickSubmitButton();
    expect(checkError().username).not.toBeInTheDocument();
    expect(checkError().password).toBeInTheDocument();

    // Then Filling password field and submitting
    await fillInput(getFormElement().passwordInput, "testPassword");
    await clickSubmitButton();
    expect(checkError().username).not.toBeInTheDocument();
    expect(checkError().password).not.toBeInTheDocument();
    expect(checkError().confirmPassword).toBeInTheDocument();

    // Then Filling confirm password field and submitting
    await fillInput(getFormElement().confirmPasswordInput, "testPassword");
    await clickSubmitButton();
    expect(checkError().username).not.toBeInTheDocument();
    expect(checkError().password).not.toBeInTheDocument();
    expect(checkError().confirmPassword).not.toBeInTheDocument();
    expect(checkError().role).toBeInTheDocument();

    // Then select role and submitting
    await userEvent.click(getFormElement().sellerRadio);
    await userEvent.click(getFormElement().customerRadio);
    await clickSubmitButton();
    expect(checkError().username).not.toBeInTheDocument();
    expect(checkError().password).not.toBeInTheDocument();
    expect(checkError().confirmPassword).not.toBeInTheDocument();
    expect(checkError().role).not.toBeInTheDocument();
  });

  it("should display error messages for invalid passwords (must be at least 6 characters long) after submitting", async () => {
    // Attempt to submit with an invalid password
    await fillInput(getFormElement().passwordInput, "weak");
    await clickSubmitButton();

    // Check if the error message is displayed
    expect(checkError().passwordLength).toBeInTheDocument();
  });

  // it("should display error message for mismatched passwords", () => {
  //   const passwordInput = screen.getByPlaceholderText(/^password$/i);
  //   const confirmPasswordInput =
  //     screen.getByPlaceholderText(/confirm password/i);
  //   const submitButton = screen.getByRole('button', {name: /register/i});

  //   // Attempt to submit with mismatched passwords
  //   fillInput(passwordInput, { target: { value: "Test123!" } });
  //   fillInput(confirmPasswordInput, { target: { value: "Mismatched123!" } });
  //   userEvent.click(submitButton);

  //   // Check if the error message is displayed
  //   const passwordMismatchError = screen.getByText
  //   expect(passwordMismatchError).toBeInTheDocument();
  // });

  // Implement mocking API call (POST) with Mocking Service Worker (MSW)
  // it("should submit the form with correct valuesf", async () => {
  //   const usernameInput = screen.getByPlaceholderText(/username/i);
  //   const passwordInput = screen.getByPlaceholderText(/^password$/i);
  //   const confirmPasswordInput =
  //     screen.getByPlaceholderText(/confirm password/i);
  //   const sellerRadio = screen.getByLabelText(/seller/i);
  //   const submitButton = screen.getByRole('button', {name: /register/i});

  //   fillInput(usernameInput, { target: { value: "testUser" } });
  //   fillInput(passwordInput, { target: { value: "Test123!" } });
  //   fillInput(confirmPasswordInput, {
  //     target: { value: "Test123!" },
  //   });
  //   userEvent.click(sellerRadio);
  //   userEvent.submit(submitButton);

  //   // Assert that form submission is successful, e.g., by checking for a success message or redirection
  //   const homePageHeading = await screen.findByText(/homepage/i);
  //   expect(homePageHeading).toBeInTheDocument();

  //   // You can also mock the API call and check if it was called with the correct values
  // });
});
