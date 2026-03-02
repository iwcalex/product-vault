/**
 * Mock expo/src/winter for Jest: set __ExpoImportMetaRegistry so expo-modules-core and tests can run.
 */
Object.defineProperty(globalThis, '__ExpoImportMetaRegistry', {
  value: {
    get url() {
      return '';
    },
  },
  enumerable: false,
  writable: true,
});
