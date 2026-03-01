module.exports = {
  preset: 'jest-expo',
  resolver: '<rootDir>/jest.resolver.js',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg))',
  ],
  moduleNameMapper: {
    '^expo/src/winter/runtime\\.native$': '<rootDir>/node_modules/expo/src/winter/runtime.ts',
    '^expo/src/async-require/setup$': '<rootDir>/__mocks__/expo-async-require-setup.js',
    '^expo/src/winter$': '<rootDir>/__mocks__/expo-winter.js',
  },
};
