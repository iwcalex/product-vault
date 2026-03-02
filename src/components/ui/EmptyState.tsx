import { View, Text, StyleSheet } from 'react-native';

type EmptyStateProps = {
  message?: string;
};

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message ?? 'No items to show.'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});
