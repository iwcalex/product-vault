import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/navigationTypes';
import { ScreenContainer, LoadingState, ErrorState } from '../components/ui';
import { useProduct } from '../hooks/useProduct';
import { useFavorites } from '../context/favorites';
import { formatPrice } from '../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ route }: Props) {
  const { productId } = route.params;
  const { data, isLoading, isError, error, refetch } = useProduct(productId);
  const { toggleFavorite, isFavorite } = useFavorites();

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
            error instanceof Error ? error.message : 'Failed to load product'
          }
          onRetry={() => refetch()}
        />
      </ScreenContainer>
    );
  }

  if (!data) {
    return (
      <ScreenContainer>
        <View style={styles.centered}>
          <Text>Product not found</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        testID="product-detail-scroll"
      >
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.price}>{formatPrice(data.price)}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imagesScroll}
          contentContainerStyle={styles.imagesContent}
        >
          {data.images.map((uri, index) => (
            <Image
              key={`${uri}-${index}`}
              source={{ uri }}
              style={styles.image}
            />
          ))}
        </ScrollView>
        <Pressable
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(data.id)}
          data-testid="product-detail-favorite-button"
        >
          <Text style={styles.favoriteButtonText}>
            {isFavorite(data.id) ? 'Unfavorite' : 'Favorite'}
          </Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  imagesScroll: {
    marginHorizontal: -16,
  },
  imagesContent: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  favoriteButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#333',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
