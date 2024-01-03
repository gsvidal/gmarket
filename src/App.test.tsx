import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// AIM
// ACT
// ASSERT

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
});

describe("App", () => {
  it("should render logo", () => {
    expect(screen.getByText(/market/i)).toBeInTheDocument()
  });
  it("should render Home navigation item", () => {
    expect(screen.getByText(/home/i)).toBeInTheDocument()
  });
});


