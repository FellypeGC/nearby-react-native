// Anti-EMFILE on Windows: cap Metro transformer workers so thousands of
// parallel file opens don't overwhelm real-time antivirus filters.
// Merged over the Expo default config (SDK 57).
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.maxWorkers = 2;

// Anti-EMFILE part 2: the on-disk transform cache under %TEMP%\metro-cache
// kept a poisoned bucket that crashed every HMR on this machine. Disabling
// file cache removes the lock source entirely (cold bundles get slower,
// incremental loads are unaffected for the verdict session).
config.cacheStores = [];

module.exports = config;
