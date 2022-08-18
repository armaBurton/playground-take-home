import { render, screen } from '@testing-library/react';
import App from './App';

test('Click Me to Upload TXT File', () => {
  render(<App />);
  const linkElement = screen.getByText(/Click Me to Upload TXT File/i);
  expect(linkElement).toBeInTheDocument();
});
