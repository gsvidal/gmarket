import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Register } from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Register />
      </Provider>
    </BrowserRouter>
  );
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
    await fillInput(getFormElement().usernameInput, "testUser");
    await fillInput(getFormElement().passwordInput, "weak");
    await fillInput(getFormElement().confirmPasswordInput, "weak");
    await userEvent.click(getFormElement().sellerRadio);

    await clickSubmitButton();

    // Check if the error message is displayed
    expect(checkError().passwordLength).toBeInTheDocument();
  });

  it("should display error message for mismatched passwords", async () => {
    await fillInput(getFormElement().usernameInput, "testUser");
    await fillInput(getFormElement().passwordInput, "strongpsw");
    await fillInput(getFormElement().confirmPasswordInput, "strongpsw2");
    await userEvent.click(getFormElement().sellerRadio);

    await clickSubmitButton();

    // Check if the error message is displayed
    expect(checkError().passwordsDontMatch).toBeInTheDocument();
  });

  it("should not display error message for same passwords", async () => {
    await fillInput(getFormElement().usernameInput, "testUser");
    await fillInput(getFormElement().passwordInput, "strongpsw");
    await fillInput(getFormElement().confirmPasswordInput, "strongpsw");
    await userEvent.click(getFormElement().sellerRadio);

    await clickSubmitButton();

    // Check if the error message is displayed
    expect(checkError().passwordsDontMatch).not.toBeInTheDocument();
  });

  // Implement mocking API call (POST) with Mocking Service Worker (MSW)

  it("submits the form, updates the Redux store, and navigates to the dashboard", async () => {
    await fillInput(getFormElement().usernameInput, "testUser");
    await fillInput(getFormElement().passwordInput, "strongpsw");
    await fillInput(getFormElement().confirmPasswordInput, "strongpsw");
    await userEvent.click(getFormElement().sellerRadio);

    await clickSubmitButton();

    await waitFor(() => {
      const state = store.getState();
      expect(state.user).toEqual({
        id: 123,
        username: "example_user",
        role: "Seller",
        creationDate: "2023-11-21T20:56:27.133Z",
        token: "abcdefg",
        isUserAuth: true,
      });
    });
  });
});
