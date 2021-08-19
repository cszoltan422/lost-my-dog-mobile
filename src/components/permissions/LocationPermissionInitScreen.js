import React from 'react';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import {StyleSheet, Text, View, Linking, Platform} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import colors from '../../colors';
import i18n from '../../i18n/i18n';
import {
    LOCATION_PERMISSION_ASK_DENIED_DESCRIPTION,
    LOCATION_PERMISSION_ASK_DESCRIPTION,
    LOCATION_PERMISSION_BUTTON_TITLE,
    LOCATION_PERMISSION_DENIED_BUTTON_TITLE,
    LOCATION_PERMISSION_DENIED_TITLE,
    LOCATION_PERMISSION_TITLE
} from '../../i18n/i18n.keys';

const LocationPermissionInitScreen = (props) => {

    const onAskLocationPermission = async () => {
        await Location.requestPermissionsAsync();
        props.onCheckLocationPermission();
    }

    const onOpenSettingsApp = async () => {
        if (Platform.OS === 'ios') {
            await Linking.openSettings();
        } else {
            await IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_SETTINGS);
        }
    }

    const granted = props.locationPermission.granted;
    const canAskAgain = props.locationPermission.canAskAgain;

    let screenTitle = '';
    let buttonTitle = '';
    let description = '';
    let icon = '';
    let buttonPressHandler = () => {};

    if (granted) {
        props.onCheckLocationPermission();
    } else if (!granted && canAskAgain) {
        screenTitle = i18n.t(LOCATION_PERMISSION_TITLE);
        buttonTitle = i18n.t(LOCATION_PERMISSION_BUTTON_TITLE);
        description = i18n.t(LOCATION_PERMISSION_ASK_DESCRIPTION);
        icon = 'room';
        buttonPressHandler = onAskLocationPermission;

        clearTimeout();
    } else if (!granted && !canAskAgain) {
        screenTitle = i18n.t(LOCATION_PERMISSION_DENIED_TITLE);
        buttonTitle = i18n.t(LOCATION_PERMISSION_DENIED_BUTTON_TITLE);
        description = i18n.t(LOCATION_PERMISSION_ASK_DENIED_DESCRIPTION);
        icon = 'settings';
        buttonPressHandler = onOpenSettingsApp;

        setTimeout(() => {
            props.onCheckLocationPermission();
        }, 1000);
    }

    return (
        <View style={styles.screenStyle}>
            <View style={styles.contentStyle}>
                <View style={styles.titleContainerStyle}>
                    <Text style={styles.titleStyle}>
                        {screenTitle}
                    </Text>
                </View>
                <View style={styles.bottomContainerStyle}>
                    <View style={styles.actionButtonContainerStyle}>
                        <Button
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
                        <Text style={styles.descriptionStyle}>
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


LocationPermissionInitScreen.propTypes = {
    locationPermission: PropTypes.shape({
        granted: PropTypes.bool.isRequired,
        canAskAgain: PropTypes.bool.isRequired
    }).isRequired,
    onCheckLocationPermission: PropTypes.func.isRequired
};

export default LocationPermissionInitScreen;