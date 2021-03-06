import React from 'react';
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import {StyleSheet, Text, View, Linking, Platform} from 'react-native';
import colors from '../colors';
import i18n from '../i18n/i18n';
import {ActivityAction} from 'expo-intent-launcher';
import {useDispatch} from 'react-redux';
import {ApplicationPermission, locationPermissionChecked} from '../redux/reducers/application/application-reducer';
import {Button, Icon} from '@rneui/base';

interface IProps {
    locationPermission: ApplicationPermission
}

const LocationPermissionInitScreen = (props: IProps) => {
    const dispatch = useDispatch();

    const onAskLocationPermission = async () => {
        const response = await Location.requestForegroundPermissionsAsync();
        dispatch(locationPermissionChecked(response));
    };

    const onOpenSettingsApp = async () => {
        if (Platform.OS === 'ios') {
            await Linking.openSettings();
        } else {
            await IntentLauncher.startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
        }
    };

    const granted = props.locationPermission.granted;
    const canAskAgain = props.locationPermission.canAskAgain;

    let screenTitle = '';
    let buttonTitle = '';
    let description = '';
    let icon = '';
    let buttonPressHandler = undefined;

    if (!granted && canAskAgain) {
        screenTitle = i18n.t('permissions.location.enableLocation');
        buttonTitle = i18n.t('permissions.location.allowLocation');
        description = i18n.t('permissions.location.askDescription');
        icon = 'room';
        buttonPressHandler = onAskLocationPermission;
    } else if (!granted && !canAskAgain) {
        screenTitle = i18n.t('general.oops');
        buttonTitle = i18n.t('permissions.location.openSettings');
        description = i18n.t('permissions.location.permissionDeniedDescription');
        icon = 'settings';
        buttonPressHandler = onOpenSettingsApp;
    }

    return (
        <View
            testID='location-permission-screen-container'
            style={styles.screenStyle}>
            <View style={styles.contentStyle}>
                <View style={styles.titleContainerStyle}>
                    <Text
                        testID='location-permission-title-text'
                        style={styles.titleStyle}>
                        {screenTitle}
                    </Text>
                </View>
                <View style={styles.bottomContainerStyle}>
                    <View style={styles.actionButtonContainerStyle}>
                        <Button
                            testID='location-permission-button'
                            icon={
                                <Icon
                                    style={styles.iconStyle}
                                    name={icon}
                                    type='material'
                                    size={16}
                                    color={colors.white} />
                            }
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{color: colors.white}}
                            title={buttonTitle}
                            onPress={buttonPressHandler} />
                    </View>
                    <View style={styles.descriptionContainerStyle}>
                        <Text
                            testID='location-permission-description-text'
                            style={styles.descriptionStyle}>
                            {description}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'center'
    },
    contentStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: colors.white,
    },
    titleContainerStyle: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.accentColor
    },
    bottomContainerStyle: {
        flex: 3
    },
    actionButtonContainerStyle: {
        alignSelf: 'center',
    },
    iconStyle: {
        marginEnd: 8
    },
    buttonStyle: {
        marginStart: 8,
        marginEnd: 8,
        backgroundColor: colors.accentColor
    },
    descriptionContainerStyle: {
        alignSelf: 'center',
        width: '80%',
        marginTop: 32
    },
    descriptionStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.accentColor
    }

});

export default LocationPermissionInitScreen;