
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Button />
      </Provider>
    </BrowserRouter>
  );
});

describe(Button, () => {
  it("renders correctly", () => {
    expect(screen.getByText(/Button/i)).toBeInTheDocument()
  });
});
