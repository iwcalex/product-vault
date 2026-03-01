import { View, Text, StyleSheet } from 'react-native';

export default function ProductListScreen() {
  return (
    <View style={styles.container}>
      <Text>Product List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
