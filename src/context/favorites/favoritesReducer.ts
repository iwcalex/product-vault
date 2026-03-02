import type { FavoritesState, FavoritesAction } from './favoritesTypes';

export const initialFavoritesState: FavoritesState = {
  favoriteIds: [],
};

export function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState {
  switch (action.type) {
    case 'TOGGLE': {
      const id = action.payload.id;
      const isPresent = state.favoriteIds.includes(id);
      const favoriteIds = isPresent
        ? state.favoriteIds.filter((x) => x !== id)
        : [...state.favoriteIds, id];
      return { favoriteIds };
    }
    case 'SET':
      return { favoriteIds: action.payload.favoriteIds };
    default:
      return state;
  }
}
