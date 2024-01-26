
import { render, screen } from '@testing-library/react';
import { Loader } from '.';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Loader />
      </Provider>
    </BrowserRouter>
  );
});

describe("Loader", () => {
  it("renders correctly", () => {
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
