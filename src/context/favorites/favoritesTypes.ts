export interface FavoritesState {
  favoriteIds: number[];
}

export type FavoritesAction =
  | { type: 'TOGGLE'; payload: { id: number } }
  | { type: 'SET'; payload: { favoriteIds: number[] } };

export interface FavoritesContextValue {
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}
