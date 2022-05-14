import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SplashImage from './splash/SplashImage';
import LostMyDogNavigator from './navigation/LostMyDogNavigator';
import LocationPermissionInitScreen from '../screens/location-permission-init-screen';
import {
    onApplicationMounted,
    onCheckLocationPermission
} from '../redux/actions/application/action-creators/action-creators';
import {useComponentDidMount} from '../hooks/useComponentDidMount';
import {useComponentWillUnmount} from '../hooks/useComponentWillUnmount';

const ApplicationWrapper = () => {

    const [elapsedTime, setElapsedTime] = useState(0);

    const applicationInitialized = useSelector(state => state.application.applicationInitialized);
    const locationPermission = useSelector(state => state.application.permissions.location);

    const dispatch = useDispatch();

    useComponentDidMount(() => {
        dispatch(onApplicationMounted());
        setInterval(() => {
            setElapsedTime((prevState) => {
                return prevState + 400;
            });
        }, 400);
    });

    useComponentWillUnmount(() => {
        clearInterval();
    });

    if (!applicationInitialized || elapsedTime < 1600) {
        return (
            <SplashImage />
        );
    } else if (!locationPermission.granted) {
        return (
            <LocationPermissionInitScreen
                locationPermission={locationPermission}
                onCheckLocationPermission={(locationPermissionResponse) => dispatch(onCheckLocationPermission(locationPermissionResponse))} />
        );
    } else {
        return (
            <View
                testID='application-container'
                style={styles.content}>
                <LostMyDogNavigator />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default ApplicationWrapper;