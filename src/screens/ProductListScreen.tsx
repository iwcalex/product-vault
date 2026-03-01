import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/navigationTypes';
import { ScreenContainer } from '../components/ui';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

export default function ProductListScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.title}>Product List</Text>
        <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('ProductDetail', { productId: 1 })}
        data-testid="product-list-go-to-detail"
      >
        <Text style={styles.buttonText}>View product 1</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ddd',
  },
  buttonText: {
    fontSize: 14,
  },
});
