import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Linking} from 'react-native';
import FloatingActionButton from '../components/common/floating-action-button/floating-action-button';
import LostDogDetailsReadonly from '../components/lost-dog-details/LostDogDetailsReadonly';
import {
    LOGIN_NAVIGATION_SCREEN_NAME,
    SUBMIT_DOG_NAVIGATION_SCREEN_NAME
} from '../application.constants';
import colors from '../colors';
import i18n from '../i18n/i18n';

const DetailsScreen = ({ route, navigation }) => {

    const { dog } = route.params;
    const user = useSelector(state => state.application.user);

    const onCallOwnerButtonPressed = () => {
        Linking.openURL(`tel:${dog.contactPhone}`);
    };

    const onSendOwnerButtonPressed = () => {
        Linking.openURL(`mailto:${dog.contactEmail}`);
    };

    return (
        <>
            <LostDogDetailsReadonly
                dog={dog}
                onSendOwnerButtonPressed={onSendOwnerButtonPressed}
                onCallOwnerButtonPressed={onCallOwnerButtonPressed} />
            <FloatingActionButton
                color={colors.primaryColor}
                icon={{ name: 'add', color: colors.white }}
                openIcon={{ name: 'close', color: colors.white }}
                actions={[
                    {
                        title: i18n.t('general.submitLostDog'),
                        icon: { name: 'add', color: colors.white },
                        color: colors.primaryColor,
                        pressHandler: () => {
                            navigation.navigate(user.isLoggedIn ?
                                SUBMIT_DOG_NAVIGATION_SCREEN_NAME
                                : LOGIN_NAVIGATION_SCREEN_NAME
                            );
                        }
                    }
                ]} />
        </>
    );
};

DetailsScreen.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default DetailsScreen;
