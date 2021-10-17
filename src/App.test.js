import { render, screen } from '@testing-library/react';
import App from './App';

test('renders titles', () => {
  render(<App />);
  const categoriesTitle = screen.getByText(/Categories/i);
  const productsTitle = screen.getByText(/Products/i);
  expect(categoriesTitle).toBeInTheDocument();
  expect(productsTitle).toBeInTheDocument();
});
