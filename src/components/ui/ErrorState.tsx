import { View, Text, StyleSheet, Pressable } from 'react-native';

type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message ?? 'Something went wrong.'}</Text>
      <Pressable
        style={styles.button}
        onPress={onRetry}
        data-testid="error-state-retry-button"
      >
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
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
  button: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
