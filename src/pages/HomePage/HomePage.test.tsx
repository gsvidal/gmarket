import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomePage } from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { configureStore } from "@reduxjs/toolkit";
import { server } from "../../mocks/node";
import { HttpResponse, http } from "msw";

const API_URL = import.meta.env.VITE_API_URL as string;

describe("HomePage", () => {
  it("should render username from redux store", () => {
    // Create a mock store with an initial state
    const store = configureStore({
      reducer: {
        user: () => ({ username: "testuser" }),
        product: () => ({ allProducts: [] }),
      },
    });

    // Render the component with the mock store
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    // Check if the username is rendered correctly
    expect(screen.getByText(/welcome testuser!/i)).toBeInTheDocument();
  });

  it("should render error message if products couldn't be fetched", async () => {
    server.use(
      http.get(`${API_URL}/all_products`, () => {
        // Respond with "500 " to "GET /all_produts" requests.
        return HttpResponse.json(
          { error: "Couldn't retrieve products. Error: Test error" },
          { status: 500 }
        );
      })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );
    expect(
      await screen.findByText(/Couldn't retrieve products. Error: Test error/i)
    ).toBeInTheDocument();
  });

  it("should not render 'Product List is empty' if products couldn't be fetched", async () => {
    server.use(
      http.get(`${API_URL}/all_products`, () => {
        // Respond with "500 " to "GET /all_produts" requests.
        return HttpResponse.json(
          { error: "Couldn't retrieve products. Error: Test error" },
          { status: 500 }
        );
      })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );
    expect(
      await screen.findByText("Couldn't retrieve products. Error: Test error")
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/product list is empty/i)
    ).not.toBeInTheDocument();
  });
});
