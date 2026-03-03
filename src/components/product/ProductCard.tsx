import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import type { Product } from '../../api/products';
import { formatPrice } from '../../utils/formatters';

type ProductCardProps = {
  product: Product;
  onPress: () => void;
  isFavorite?: boolean;
};

export default function ProductCard({
  product,
  onPress,
  isFavorite = false,
}: ProductCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
      testID={`product-card-${product.id}`}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>
      <View
        style={styles.favoriteArea}
        testID="product-card-favorite-indicator"
      >
        {isFavorite ? (
          <Text style={styles.favoriteIcon}>♥</Text>
        ) : (
          <View style={styles.favoritePlaceholder} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
    }),
  },
  cardPressed: {
    opacity: 0.92,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
    minWidth: 0,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  favoriteArea: {
    width: 40,
    height: 40,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 22,
    color: '#c00',
  },
  favoritePlaceholder: {
    width: 22,
    height: 22,
  },
});
