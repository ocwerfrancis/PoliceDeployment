import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders sign in link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Sign In/i);
  expect(linkElement).toBeInTheDocument();
});
