const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
    const defaultConfig = await getDefaultConfig(__dirname);
    return {
        ...defaultConfig,
        // You can add custom Metro configurations here if needed
    };
})();