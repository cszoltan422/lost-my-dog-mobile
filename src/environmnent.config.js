import Constants from 'expo-constants';

const ENV = {
    develop: {
        API_URL: 'http://localhost:8080',
    },
    staging: {
        API_URL: 'https://lost-my-dog-staging.herokuapp.com/',
    },
    production: {
        API_URL: 'https://lost-my-dog-prod.herokuapp.com',
    },
}
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // Default values for `releaseChannel` are `undefined` in dev mode and `default` in production
    if (__DEV__) {
        return ENV.develop
    }
    // using `indexOf` will let you pick up dev, develop, development, dev-v1, dev-v2, dev-v3, and so on..
    // Returns `-1` if the value is not found.
    if (env.indexOf('dev') !== -1) return ENV.develop
    if (env.indexOf('staging') !== -1) return ENV.staging
    if (env.indexOf('prod') !== -1) return ENV.production
    return ENV.develop // If you do not specify a channel, you will publish to the `default` channel.
}
export default getEnvVars();