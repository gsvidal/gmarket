import { render, screen } from "@testing-library/react";
import { Pagination } from ".";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

describe(Pagination, () => {
  it("renders correctly prev, next and page 1 buttons when are 1 page in total", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination totalPages={1} currentPage={1} onChangePage={() => {}} />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/prev/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });
  it("renders correctly prev, next and page 1 buttons when are 1 page in total", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination totalPages={3} currentPage={1} onChangePage={() => {}} />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/prev/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });
  it("renders ellipsis if totalPages is greater than max pages to show (5)", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination totalPages={6} currentPage={1} onChangePage={() => {}} />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/\.\.\./)).toBeInTheDocument();
  });
  it("should not render ellipsis if totalPages is less than or equal to max pages to show (5)", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination totalPages={5} currentPage={1} onChangePage={() => {}} />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.queryByText(/\.\.\./)).not.toBeInTheDocument();
  });
});
