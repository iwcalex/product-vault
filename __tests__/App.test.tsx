import { render, screen } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders product list screen', () => {
    render(<App />);
    expect(screen.getByText('Product List')).toBeTruthy();
  });
});
