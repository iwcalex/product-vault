import { render, screen } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders product-vault text', () => {
    render(<App />);
    expect(screen.getByText('product-vault')).toBeTruthy();
  });
});
