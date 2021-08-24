import Constants from 'expo-constants';

const ENV = {
    e2e: {
        API_URL: 'http://192.168.1.70:8080',
        GET_DEVICE_LOCATION: false
    },
    develop: {
        API_URL: 'http://192.168.1.70:8080',
        GET_DEVICE_LOCATION: true
    },
    staging: {
        API_URL: 'https://lost-my-dog-staging.herokuapp.com',
        GET_DEVICE_LOCATION: true
    },
    production: {
        API_URL: 'https://lost-my-dog-prod.herokuapp.com',
        GET_DEVICE_LOCATION: true
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