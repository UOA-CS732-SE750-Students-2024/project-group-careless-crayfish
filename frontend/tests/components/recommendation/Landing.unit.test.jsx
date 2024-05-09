import { render, screen } from '@testing-library/react';
import { Landing } from '../../../src/components/Recommendation/Landing';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../../src/components/GlobalProviders', () => ({
  useRoute: () => ({
    setPageTitle: vi.fn(),
    pageTitle: 'Recommendation',
  }),
}));

describe('Landing', () => {
  it('renders without crashing', () => {
    render(<Landing />);
    const linkElement = screen.getByText(/Find me .../i);
    expect(linkElement).toBeInTheDocument();
  });
});