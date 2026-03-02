import { render, screen } from '@testing-library/react-native';
import App from '../App';

/* eslint-disable @typescript-eslint/no-require-imports -- require inside jest.mock factory must use require for Jest hoisting */
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  const actual = jest.requireActual('react-native-safe-area-context');
  const mockInsets = { top: 0, left: 0, right: 0, bottom: 0 };
  const mockFrame = { x: 0, y: 0, width: 320, height: 640 };
  return {
    ...actual,
    initialWindowMetrics: { frame: mockFrame, insets: mockInsets },
    useSafeAreaInsets: () => mockInsets,
    useSafeAreaFrame: () => mockFrame,
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(View, null, children),
    SafeAreaView: ({ children }: { children: React.ReactNode }) =>
      React.createElement(View, null, children),
  };
});
/* eslint-enable @typescript-eslint/no-require-imports */

describe('App', () => {
  it('renders product list screen', () => {
    render(<App />);
    expect(screen.getByText('Product List')).toBeTruthy();
  });
});
