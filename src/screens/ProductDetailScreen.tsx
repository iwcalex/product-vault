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

  const favorited = isFavorite(data.id);
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        testID="product-detail-scroll"
      >
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: data.images[0] }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>
        {data.images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbsScroll}
            contentContainerStyle={styles.thumbsContent}
          >
            {data.images.map((uri, index) => (
              <Image
                key={`${uri}-${index}`}
                source={{ uri }}
                style={styles.thumbImage}
              />
            ))}
          </ScrollView>
        )}
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.price}>{formatPrice(data.price)}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Pressable
          style={[
            styles.favoriteButton,
            favorited && styles.favoriteButtonActive,
          ]}
          onPress={() => toggleFavorite(data.id)}
          testID="product-detail-favorite-button"
        >
          <Text style={styles.favoriteButtonText}>
            {favorited ? '♥ Unfavorite' : '♥ Favorite'}
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
  heroContainer: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  thumbsScroll: {
    marginHorizontal: -16,
    marginBottom: 20,
  },
  thumbsContent: {
    paddingHorizontal: 16,
  },
  thumbImage: {
    width: 72,
    height: 72,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 24,
  },
  favoriteButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#333',
  },
  favoriteButtonActive: {
    backgroundColor: '#555',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
