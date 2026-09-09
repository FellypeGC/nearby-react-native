// Anti-EMFILE on Windows: cap Metro transformer workers so thousands of
// parallel file opens don't overwhelm real-time antivirus filters.
// Merged over the Expo default config (SDK 57).
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.maxWorkers = 2;

module.exports = config;
