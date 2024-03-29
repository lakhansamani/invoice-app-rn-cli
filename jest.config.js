module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-native-storage|@react-native-async-storage/async-storage|@gluestack-ui|@gluestack-ui/.*|@legendapp/motion)',
  ],
  testPathIgnorePatterns: ['e2e'],
  testTimeout: 30000,
};
