import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../../../colors';
import {EDIT_DOG_NAVIGATION_SCREEN_NAME} from '../../../application.constants';
import {useSelector} from 'react-redux';

const LostDogDetailsNavigationHeader = (props) => {

    const user = useSelector(state => state.application.user);
    const shouldShowSubmissionEditIcon = user.isLoggedIn && user.details.id === props.dog.submittedByUserId;

    return (
        <View style={styles.headerRight}>
            {shouldShowSubmissionEditIcon && (
                <Icon
                    testID='details-screen-edit-own-submission-button'
                    type='material'
                    name='mode-edit'
                    color={colors.white}
                    onPress={() => props.navigation.replace({
                        routeName: EDIT_DOG_NAVIGATION_SCREEN_NAME,
                        params: {[EDIT_DOG_NAVIGATION_SCREEN_NAME]: props.dog}
                    })} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    headerRight: {
        marginEnd: 16
    }
});

LostDogDetailsNavigationHeader.propTypes = {
    dog: PropTypes.shape({
        id: PropTypes.number.isRequired,
        submittedByUserId: PropTypes.number.isRequired,
        dogName: PropTypes.string.isRequired,
        dogBreed: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
        dateLost: PropTypes.string.isRequired,
        contactPhone: PropTypes.string.isRequired,
        contactEmail: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
        avatarFilename: PropTypes.string.isRequired,
        chippedStatus: PropTypes.string.isRequired,
        chipNumber: PropTypes.string.isRequired,
        specialPeculiarities: PropTypes.string.isRequired
    }).isRequired,
    navigation: PropTypes.object.isRequired
};

export default LostDogDetailsNavigationHeader;