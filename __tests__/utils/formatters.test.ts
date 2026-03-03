import { formatPrice } from '../../src/utils/formatters';

describe('formatPrice', () => {
  it('formats zero as USD currency', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('formats decimal with two places', () => {
    expect(formatPrice(1.2)).toBe('$1.20');
  });

  it('formats typical price', () => {
    expect(formatPrice(19.99)).toBe('$19.99');
  });

  it('formats large number with commas', () => {
    expect(formatPrice(1000)).toBe('$1,000.00');
  });
});
