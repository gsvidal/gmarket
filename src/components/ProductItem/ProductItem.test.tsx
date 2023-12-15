import React from 'react';
import { render } from 'vitest';
import { ProductItem } from './ProductItem';

test('renders ProductItem', () => {
  const { container } = render(<ProductItem />);
  expect(container.firstChild).toBeInTheDocument();
});