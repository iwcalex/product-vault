import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesProvider, useFavorites } from '../../src/context/favorites';

function TestConsumer() {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();
  return (
    <View>
      <Text testID="favorite-count">{favoriteIds.length}</Text>
      <Pressable testID="toggle-1" onPress={() => toggleFavorite(1)}>
        <Text>{isFavorite(1) ? 'Yes' : 'No'}</Text>
      </Pressable>
      <Pressable testID="toggle-2" onPress={() => toggleFavorite(2)}>
        <Text>{isFavorite(2) ? 'Yes' : 'No'}</Text>
      </Pressable>
    </View>
  );
}

describe('Favorites context', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(AsyncStorage.getItem).mockResolvedValue(null);
    jest.mocked(AsyncStorage.setItem).mockResolvedValue(undefined);
  });

  it('rehydration loads saved favorites from AsyncStorage', async () => {
    jest.mocked(AsyncStorage.getItem).mockResolvedValue('[1, 2, 3]');
    render(
      <FavoritesProvider>
        <TestConsumer />
      </FavoritesProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId('favorite-count').props.children).toBe(3);
    });
  });

  it('toggleFavorite adds and removes id correctly', async () => {
    render(
      <FavoritesProvider>
        <TestConsumer />
      </FavoritesProvider>
    );
    await screen.findByTestId('favorite-count');
    fireEvent.press(screen.getByTestId('toggle-1'));
    await waitFor(() => {
      expect(screen.getByTestId('favorite-count').props.children).toBe(1);
      expect(screen.getByText('Yes')).toBeTruthy();
    });
    fireEvent.press(screen.getByTestId('toggle-2'));
    await waitFor(() => {
      expect(screen.getByTestId('favorite-count').props.children).toBe(2);
    });
    fireEvent.press(screen.getByTestId('toggle-1'));
    await waitFor(() => {
      expect(screen.getByTestId('favorite-count').props.children).toBe(1);
    });
  });

  it('setItem is called with updated array after toggle', async () => {
    render(
      <FavoritesProvider>
        <TestConsumer />
      </FavoritesProvider>
    );
    await screen.findByTestId('favorite-count');
    fireEvent.press(screen.getByTestId('toggle-1'));
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@product_vault_favorites',
        expect.stringContaining('1')
      );
    });
  });
});
