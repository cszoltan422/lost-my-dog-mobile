import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import LostDogDetailsHeader from './header/LostDogDetailsHeader';
import LostDogDetailsContent from './content/LostDogDetailsContent';
import colors from '../../colors';

const LostDogDetails = (props) => {
    
    return (
        <ScrollView
            testID='details-screen-scroll-view' >
            <View
                testID='details-screen-container'
                style={styles.container}>
                <LostDogDetailsHeader />
                <LostDogDetailsContent
                    isLoading={props.isLoading}
                    isValid={props.isValid}
                    inputs={props.inputs}
                    onSubmitFormInputValueChanged={props.onSubmitFormInputValueChanged} />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        marginBottom: 8
    },
    columnContainer: {
        width: '50%'
    },
    buttonStyle: {
        marginStart: 8,
        marginEnd: 8,
        backgroundColor: colors.accentColor
    },
    iconStyle: {
        marginEnd: 8
    }
});

LostDogDetails.propTypes = {
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
    })
};

export default LostDogDetails;