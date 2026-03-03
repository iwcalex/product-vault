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
      <View style={styles.headerChipsContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Product List</Text>
          <Text style={styles.subtitle}>Browse by category</Text>
        </View>
        <View style={styles.chipsWrapper}>
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
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={
          products.length === 0 ? styles.emptyList : styles.productListContent
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
  headerChipsContainer: {
    backgroundColor: '#fff',
    zIndex: 1,
    elevation: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  header: {
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  chipsWrapper: {
    minHeight: 48,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  filterChipList: {
    flexGrow: 0,
  },
  filterChipListContent: {
    paddingHorizontal: 4,
  },
  filterChipSeparator: {
    width: 10,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  filterChipActive: {
    backgroundColor: '#222',
  },
  filterChipText: {
    fontSize: 13,
    color: '#444',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  productListContent: {
    paddingTop: 4,
    paddingBottom: 24,
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
