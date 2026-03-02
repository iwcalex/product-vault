import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
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
      style={styles.card}
      onPress={onPress}
      data-testid={`product-card-${product.id}`}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>
      {isFavorite && (
        <View
          style={styles.favoriteBadge}
          testID="product-card-favorite-indicator"
        >
          <Text style={styles.favoriteIcon}>♥</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
  favoriteBadge: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#c00',
  },
});
