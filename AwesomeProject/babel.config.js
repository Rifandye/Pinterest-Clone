module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // Plugin: ["expo-router/babel", "react-native-reanimated/plugin"],
  };
};
