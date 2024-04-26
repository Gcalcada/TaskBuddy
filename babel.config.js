module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', {
        // Add the @babel/preset-env preset with the desired targets
        targets: {
          node: 'current', // Target the current version of Node.js
        },
      }],
    ],
    plugins: ['react-native-reanimated/plugin'],
  };
};