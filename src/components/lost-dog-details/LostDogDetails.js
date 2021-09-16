import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import Card from '../common/card/Card';
import LocationPicker from '../common/location-picker/LocationPicker';
import LostDogDetailsHeader from './header/LostDogDetailsHeader';
import LostDogDetailsContent from './content/LostDogDetailsContent';
import i18n from '../../i18n/i18n';
import {DETAILS_MAP_VIEW_MARKER_TITLE} from '../../i18n/i18n.keys';
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
                {props.location.isPresent && (
                    <Card>
                        <LocationPicker
                            longitude={props.location.longitude}
                            latitude={props.location.latitude}
                            markerTitle={i18n.t(DETAILS_MAP_VIEW_MARKER_TITLE)}
                            iconType='font-awesome'
                            iconName='paw'
                            iconSize={24}
                            iconColor={colors.accentColor}
                            onSubmitFormLocationValueChanged={props.onSubmitFormLocationValueChanged} />
                    </Card>
                )}
                <Card>
                    <Button
                        testID='location-permission-button'
                        buttonStyle={styles.buttonStyle}
                        titleStyle={{color: colors.white}}
                        title='Submit'
                        onPress={() => null} />
                </Card>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    },
    buttonStyle: {
        marginStart: 8,
        marginEnd: 8,
        backgroundColor: colors.accentColor
    },
});

LostDogDetails.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    inputs: PropTypes.object.isRequired,
    location: PropTypes.shape({
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
        isPresent: PropTypes.bool.isRequired,
    }).isRequired,
    onSubmitFormInputValueChanged: PropTypes.func.isRequired,
    onSubmitFormLocationValueChanged: PropTypes.func.isRequired
};

export default LostDogDetails;