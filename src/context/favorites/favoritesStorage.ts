import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@product_vault_favorites';

export async function getFavorites(): Promise<number[]> {
  const raw = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
  if (raw == null) return [];
  try {
    const parsed = JSON.parse(raw) as number[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function setFavorites(ids: number[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
}
