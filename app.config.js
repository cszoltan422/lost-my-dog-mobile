export default {
    name: 'lost-my-dog-mobile',
    slug: 'lost-my-dog-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff'
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
        '**/*'
    ],
    ios: {
        supportsTablet: true,
        bundleIdentifier: 'org.zenbot.lost-my-dog-mobile'
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#FFFFFF'
        },
        package: 'org.zenbot.lost-my-dog-mobile',
    },
    web: {
        favicon: './assets/favicon.png'
    },
    extra: {
        apiUrlHost: process.env.API_URL_HOST
    }
};
