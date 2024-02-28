import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const renderHeaderComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header 
          getCartLoading={false}
        />
      </BrowserRouter>
    </Provider>
  );
};
describe("Header", () => {
  it("should render logo", () => {
    renderHeaderComponent();
    expect(screen.getByText(/market/i)).toBeInTheDocument();
  });

  it("should render Home link", () => {
    renderHeaderComponent();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  it("renders the correct links when the user is authenticated", () => {
    store.dispatch({
      type: "user/authUser",
      payload: { username: "testUser" },
    });
    renderHeaderComponent();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("renders the correct links when the user is authenticated and is seller role", () => {
    store.dispatch({
      type: "user/authUser",
      payload: { username: "testUser", role: "Seller" },
    });
    renderHeaderComponent();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders the correct links when the user is not authenticated", () => {
    store.dispatch({ type: "user/resetUser" });
    renderHeaderComponent();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
