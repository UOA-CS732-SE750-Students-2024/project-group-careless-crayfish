import App from '@frontend-ui/App';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

// TODO put app end-to-end tests here.
describe('App', () => {
  it('renders the App component', () => {
    const { container } = render(<App />);

    expect(container).toBeTruthy();
  });
});
