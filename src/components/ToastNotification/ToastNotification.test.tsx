import { act, render, screen } from "@testing-library/react";
import { ToastNotification } from ".";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import { setToastNotification } from "../../redux/states/toastNotification.slice";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ToastNotification />
      </Provider>
    </BrowserRouter>
  );
});

describe(ToastNotification, () => {

  it("renders correctly its message", async () => {
    // Dispatch the setToastNotification action
    await act(async () => {
      store.dispatch(
        setToastNotification({ message: "Product ok", type: "success" })
      );
    });
    expect(screen.getByText(/Product ok/i)).toBeInTheDocument();
  });

});
