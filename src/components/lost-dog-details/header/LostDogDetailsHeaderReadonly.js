import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text} from 'react-native';
import Card from '../../common/card/Card';
import ENV from '../../../environmnent.config';
import colors from '../../../colors';

const LostDogDetailsHeaderReadonly = (props) => {

    return (
        <>
            <Card>
                <Image
                    testID='details-screen-image'
                    style={styles.imageStyle}
                    source={{uri: `${ENV.API_URL}/image/${props.dog.avatarFilename}`,}} />
            </Card>
            <Card styles={styles.descriptionCardStyle}>
                <Text
                    testID='details-screen-description-text'
                    style={styles.descriptionTextStyle}>
                    {props.dog.description}
                </Text>
            </Card>
        </>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        flex: 1,
        resizeMode: 'cover',
        height: 400
    },
    descriptionCardStyle: {
        height: 'auto',
        backgroundColor: colors.accentColor
    },
    descriptionTextStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        fontStyle: 'italic'
    },
    descriptionTextInputStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 14,
        fontStyle: 'italic',
        borderBottomWidth: 1
    }
});

LostDogDetailsHeaderReadonly.propTypes = {
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
        status: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
        avatarFilename: PropTypes.string.isRequired,
        chippedStatus: PropTypes.string.isRequired,
        chipNumber: PropTypes.string.isRequired,
        specialPeculiarities: PropTypes.string.isRequired
    }).isRequired
};

export default LostDogDetailsHeaderReadonly;