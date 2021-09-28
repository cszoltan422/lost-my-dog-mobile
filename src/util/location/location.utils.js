import ENV from '../../environmnent.config';
import * as Location from 'expo-location';
import {E2E_MOCK_LOCATION} from '../../application.constants';

export const getLocation = async (accuracy) => {
    if (ENV.GET_DEVICE_LOCATION) {
        return Location.getCurrentPositionAsync({
            accuracy: accuracy
        });
    } else {
        return {
            coords: {
                longitude: E2E_MOCK_LOCATION.longitude,
                latitude: E2E_MOCK_LOCATION.latitude
            }
        };
    }
};