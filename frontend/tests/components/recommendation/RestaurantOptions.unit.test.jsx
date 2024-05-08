import { render, screen } from '@testing-library/react';
import { RestaurantOptions } from '../../../src/components/Recommendation/RestaurantOptions';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../../src/components/GlobalProviders', () => ({
  useRoute: () => ({
    setPageTitle: vi.fn(),
    pageTitle: 'Recommendation',
  }),
}));

describe('RestaurantOptions', () => {
  it('renders without crashing', () => {
    render(<RestaurantOptions />);
    const linkElement = screen.getByText(/Choose Your Dining Options/i);
    expect(linkElement).toBeInTheDocument();
  });
});