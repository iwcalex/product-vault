/**
 * Custom Jest resolver: use non-native expo winter runtime so tests run in Node.
 */
const path = require('path');

module.exports = (request, options) => {
  const resolved = options.defaultResolver(request, options);
  if (resolved && typeof resolved === 'string') {
    const normalized = path.normalize(resolved).replace(/\\/g, '/');
    if (
      normalized.includes('expo') &&
      normalized.includes('winter') &&
      normalized.includes('runtime.native')
    ) {
      return path.join(path.dirname(resolved), 'runtime.ts');
    }
  }
  return resolved;
};
