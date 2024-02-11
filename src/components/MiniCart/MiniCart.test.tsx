
import { render, screen } from '@testing-library/react';
import { MiniCart } from '.';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MiniCart />
      </Provider>
    </BrowserRouter>
  );
});

describe("MiniCart", () => {
  it("renders correctly", () => {
    expect(screen.getByText(/MiniCart/i)).toBeInTheDocument()
  });
});
