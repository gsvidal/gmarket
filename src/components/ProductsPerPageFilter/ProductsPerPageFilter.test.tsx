
import { render, screen } from '@testing-library/react';
import { ProductsPerPageFilter } from '.';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ProductsPerPageFilter />
      </Provider>
    </BrowserRouter>
  );
});

describe(ProductsPerPageFilter, () => {
  it("renders correctly", () => {
    expect(screen.getByText(/ProductsPerPageFilter/i)).toBeInTheDocument()
  });
});
