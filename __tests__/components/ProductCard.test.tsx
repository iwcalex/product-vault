import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ProductCard from '../../src/components/product/ProductCard';
import type { Product } from '../../src/api/products';

const mockProduct: Product = {
  id: 42,
  title: 'Green Chili Pepper',
  description: 'Fresh green chili',
  category: 'vegetables',
  price: 1.29,
  thumbnail: 'https://example.com/thumb.jpg',
  images: ['https://example.com/1.jpg'],
};

describe('ProductCard', () => {
  it('renders product title', () => {
    render(<ProductCard product={mockProduct} onPress={() => {}} />);
    expect(screen.getByText('Green Chili Pepper')).toBeTruthy();
  });

  it('renders formatted price', () => {
    render(<ProductCard product={mockProduct} onPress={() => {}} />);
    expect(screen.getByText('$1.29')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<ProductCard product={mockProduct} onPress={onPress} />);
    const card = screen.getByTestId('product-card-42');
    fireEvent.press(card);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows favorite indicator when isFavorite is true', () => {
    render(<ProductCard product={mockProduct} onPress={() => {}} isFavorite />);
    const indicator = screen.getByTestId('product-card-favorite-indicator');
    expect(indicator).toBeTruthy();
    expect(screen.getByText('♥')).toBeTruthy();
  });

  it('does not show heart when isFavorite is false', () => {
    render(<ProductCard product={mockProduct} onPress={() => {}} />);
    expect(screen.queryByText('♥')).toBeNull();
  });
});
