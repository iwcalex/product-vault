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

  const filterOptions: { slug: string | undefined; name: string }[] = [
    { slug: undefined, name: 'All' },
    ...categories.map((c) => ({ slug: c.slug, name: c.name })),
  ];

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

  const renderFilterChip = useCallback(
    ({ item }: { item: { slug: string | undefined; name: string } }) => {
      const isAll = item.slug === undefined;
      const isSelected = isAll
        ? selectedCategory === undefined
        : selectedCategory === item.slug;
      return (
        <Pressable
          style={[styles.filterChip, isSelected && styles.filterChipActive]}
          onPress={() => setSelectedCategory(item.slug)}
          testID={
            isAll
              ? 'product-list-filter-all'
              : `product-list-filter-${item.slug}`
          }
        >
          <Text
            style={[
              styles.filterChipText,
              isSelected && styles.filterChipTextActive,
            ]}
          >
            {item.name}
          </Text>
        </Pressable>
      );
    },
    [selectedCategory]
  );

  const filterChipKeyExtractor = useCallback(
    (item: { slug: string | undefined; name: string }) =>
      item.slug ?? '__all__',
    []
  );

  const FilterChipSeparator = useCallback(
    () => <View style={styles.filterChipSeparator} />,
    []
  );

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
      <FlatList
        data={filterOptions}
        renderItem={renderFilterChip}
        keyExtractor={filterChipKeyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterChipListContent}
        ItemSeparatorComponent={FilterChipSeparator}
        style={styles.filterChipList}
      />
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
  filterChipList: {
    maxHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterChipListContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterChipSeparator: {
    width: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 16,
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
