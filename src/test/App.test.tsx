import React from 'react';
import { render, screen } from '@testing-library/react';

test('Renders something', () => {
  render(<App />);
  const element = screen.getByText(/Versión/i);
  expect(element).toBeInTheDocument();
});
