import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/navigationTypes';
import { ScreenContainer, LoadingState, ErrorState } from '../components/ui';
import { ProductCard } from '../components/product';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useFavorites } from '../context/favorites';
import type { Product } from '../api/products';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

export default function ProductListScreen() {
  const navigation = useNavigation<NavProp>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useProducts(selectedCategory);

  const { data: categories = [] } = useCategories();
  const { isFavorite } = useFavorites();

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleProductPress = useCallback(
    (productId: number) => {
      navigation.navigate('ProductDetail', { productId });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item.id)}
        isFavorite={isFavorite(item.id)}
      />
    ),
    [handleProductPress, isFavorite]
  );

  const keyExtractor = useCallback((item: Product) => String(item.id), []);

  if (isLoading) {
    return (
      <ScreenContainer>
        <LoadingState />
      </ScreenContainer>
    );
  }

  if (isError) {
    return (
      <ScreenContainer>
        <ErrorState
          message={
            error instanceof Error ? error.message : 'Failed to load products'
          }
          onRetry={() => refetch()}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Product List</Text>
      </View>
      <View style={styles.filterRow}>
        <Pressable
          style={[
            styles.filterChip,
            selectedCategory === undefined && styles.filterChipActive,
          ]}
          onPress={() => setSelectedCategory(undefined)}
          data-testid="product-list-filter-all"
        >
          <Text
            style={[
              styles.filterChipText,
              selectedCategory === undefined && styles.filterChipTextActive,
            ]}
          >
            All
          </Text>
        </Pressable>
        {categories.map((cat) => (
          <Pressable
            key={cat.slug}
            style={[
              styles.filterChip,
              selectedCategory === cat.slug && styles.filterChipActive,
            ]}
            onPress={() => setSelectedCategory(cat.slug)}
            data-testid={`product-list-filter-${cat.slug}`}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedCategory === cat.slug && styles.filterChipTextActive,
              ]}
            >
              {cat.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={
          products.length === 0 ? styles.emptyList : undefined
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products in this category.</Text>
        }
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
        }
        testID="product-list-flatlist"
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
  filterChipActive: {
    backgroundColor: '#333',
  },
  filterChipText: {
    fontSize: 14,
  },
  filterChipTextActive: {
    color: '#fff',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
