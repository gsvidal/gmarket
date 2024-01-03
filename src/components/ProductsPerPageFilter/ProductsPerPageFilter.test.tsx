import { render, screen } from "@testing-library/react";
import { ProductsPerPageFilter } from ".";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ProductsPerPageFilter setProductsPerPage={() => {}} />
      </Provider>
    </BrowserRouter>
  );
});

describe("ProductsPerPageFilter", () => {
  it("should render correctly the select label", () => {
    expect(screen.getByLabelText(/products per page/i)).toBeInTheDocument();
  });

  it("select element should have 10 as a default value", async () => {
    expect(screen.getByLabelText(/products per page/i)).toHaveValue("10");
  });

  it("should allow selecting an option from the dropdown", async () => {
    await userEvent.selectOptions(screen.getByLabelText(/products per page/i), "25");
    expect(screen.getByLabelText(/products per page/i)).toHaveValue("25");
  });
});
