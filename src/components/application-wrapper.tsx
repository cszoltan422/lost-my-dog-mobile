import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import SplashImage from './splash/splash-image';
import LostMyDogNavigator from './navigation/lost-my-dog-navigator';
import LocationPermissionInitScreen from '../screens/location-permission-init-screen';
import {useComponentDidMount} from '../hooks/useComponentDidMount';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {applicationMounted} from '../redux/reducers/application/application-reducer';

const ApplicationWrapper = () => {

    const [elapsedTime, setElapsedTime] = useState(0);

    const applicationInitialized = useAppSelector(state => state.application.applicationInitialized);
    const locationPermission = useAppSelector(state => state.application.permissions.location);

    const dispatch = useAppDispatch();

    useComponentDidMount(() => {
        dispatch(applicationMounted());
        setInterval(() => {
            setElapsedTime((prevState) => {
                return prevState + 400;
            });
        }, 400);
    });

    if (!applicationInitialized || elapsedTime < 1600) {
        return (
            <SplashImage />
        );
    } else if (!locationPermission.granted) {
        return (
            <LocationPermissionInitScreen
                locationPermission={locationPermission} />
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