import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import LostDogDetailsHeader from './header/LostDogDetailsHeader';
import LostDogDetailsContent from './content/LostDogDetailsContent';

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
    }
});

LostDogDetails.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    inputs: PropTypes.object.isRequired,
    onSubmitFormInputValueChanged: PropTypes.func.isRequired
};

export default LostDogDetails;