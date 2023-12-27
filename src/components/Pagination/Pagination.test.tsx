
import { render, screen } from '@testing-library/react';
import { Pagination } from '.';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Pagination />
      </Provider>
    </BrowserRouter>
  );
});

describe(Pagination, () => {
  it("renders correctly", () => {
    expect(screen.getByText(/Pagination/i)).toBeInTheDocument()
  });
});
