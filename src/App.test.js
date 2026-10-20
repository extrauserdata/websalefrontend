import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the login page', () => {
  window.history.replaceState({}, '', '/login');
  render(<App />);
  expect(screen.getByRole('heading', { name: /sign in to your account/i })).toBeInTheDocument();
});

test('renders the registration page at /register', () => {
  window.history.replaceState({}, '', '/register');
  render(<App />);
  expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
});
