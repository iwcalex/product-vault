import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import {
  favoritesReducer,
  initialFavoritesState,
} from './favoritesReducer';
import type { FavoritesContextValue } from './favoritesTypes';

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    favoritesReducer,
    initialFavoritesState
  );

  const toggleFavorite = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE', payload: { id } });
  }, []);

  const isFavorite = useCallback(
    (id: number) => state.favoriteIds.includes(id),
    [state.favoriteIds]
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds: state.favoriteIds,
      toggleFavorite,
      isFavorite,
    }),
    [state.favoriteIds, toggleFavorite, isFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (ctx === null) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return ctx;
}
