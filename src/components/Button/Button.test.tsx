import { render, screen } from "@testing-library/react";
import { Button } from ".";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Button>Text</Button>
      </Provider>
    </BrowserRouter>
  );
});

describe(Button, () => {
  it("renders correctly", () => {
    expect(screen.getByText(/Text/i)).toBeInTheDocument();
  });
});
