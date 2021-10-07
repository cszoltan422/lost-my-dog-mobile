import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Linking} from 'react-native';
import LostDogDetailsReadonly from '../components/lost-dog-details/LostDogDetailsReadonly';
import FloatingActionButton from '../components/common/floating-action-button/FloatingActionButton';
import {
    DETAILS_NAVIGATION_PARAM_NAME,
    LOGIN_NAVIGATION_SCREEN_NAME,
    SUBMIT_DOG_NAVIGATION_SCREEN_NAME
} from '../application.constants';
import colors from '../colors';
import i18n from '../i18n/i18n';
import {SUBMIT_DOG_TITLE} from '../i18n/i18n.keys';

const DetailsScreen = (props) => {

    const dog = props.navigation.getParam(DETAILS_NAVIGATION_PARAM_NAME);
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
                        title: i18n.t(SUBMIT_DOG_TITLE),
                        icon: { name: 'add', color: colors.white },
                        color: colors.primaryColor,
                        pressHandler: () => {
                            props.navigation.navigate({
                                routeName: user.isLoggedIn ?
                                    SUBMIT_DOG_NAVIGATION_SCREEN_NAME
                                    : LOGIN_NAVIGATION_SCREEN_NAME
                            });
                        }
                    }
                ]} />
        </>
    );
};

DetailsScreen['navigationOptions'] = ({ navigation }) => ({
    title: navigation.getParam(DETAILS_NAVIGATION_PARAM_NAME).dogName,
    headerBackTitleVisible: false
});

DetailsScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default DetailsScreen;
