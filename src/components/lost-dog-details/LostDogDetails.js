import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import Card from '../common/card/Card';
import LocationPicker from '../common/location-picker/LocationPicker';
import LostDogDetailsHeader from './header/LostDogDetailsHeader';
import LostDogDetailsContent from './content/LostDogDetailsContent';
import i18n from '../../i18n/i18n';
import {
    DETAILS_MAP_VIEW_MARKER_TITLE,
    DETAILS_SUBMIT_BUTTON_TITLE, DETAILS_SUBMITTED_LOADING_TEXT
} from '../../i18n/i18n.keys';
import colors from '../../colors';

const LostDogDetails = (props) => {
    
    return (
        <ScrollView
            testID='details-screen-scroll-view' >
            <View
                testID='details-screen-container'
                style={styles.container}>
                <LostDogDetailsHeader
                    selectedImage={props.selectedImage}
                    onImageSelected={props.onImageSelected}
                    onImageCleared={props.onImageCleared} />
                <LostDogDetailsContent
                    isLoading={props.isLoading}
                    isValid={props.isValid}
                    inputs={props.inputs}
                    onInputValueChanged={props.onInputValueChanged} />
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
                            onLocationValueChanged={props.onLocationValueChanged} />
                    </Card>
                )}
                <Card>
                    <>
                        <Button
                            testID='details-screen-submit-button'
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{color: colors.white}}
                            title={i18n.t(DETAILS_SUBMIT_BUTTON_TITLE)}
                            loading={props.isLoading}
                            disabled={!props.isValid || props.isLoading}
                            onPress={props.onSubmit} />
                        {props.isLoading && (
                            <View style={styles.loadingProgressContainer}>
                                <Text style={styles.loadingProgressInfoTextStyle}>
                                    {i18n.t(DETAILS_SUBMITTED_LOADING_TEXT)}
                                </Text>
                                <Text style={styles.loadingProgressStageStyle}>
                                    {i18n.t(props.loading.stage)}
                                </Text>
                                <View style={styles.progressbarContainer}>
                                    <ProgressBar
                                        width={null}
                                        color={colors.accentColor}
                                        progress={props.loading.progress} />
                                </View>
                            </View>
                        )}
                    </>
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
    loadingProgressContainer: {
        marginTop: 8,
        alignItems: 'center'
    },
    loadingProgressInfoTextStyle: {
        color: colors.grey
    },
    loadingProgressStageStyle: {
        fontSize: 16,
        color: colors.accentColor,
        fontWeight: 'bold'
    },
    progressbarContainer: {
        marginTop: 8,
        alignSelf: 'flex-start',
        width: '100%'
    }
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
    selectedImage: PropTypes.shape({
        uri: PropTypes.string.isRequired,
        isPresent: PropTypes.bool.isRequired,
        errorKey: PropTypes.string.isRequired,
        isValid: PropTypes.bool.isRequired
    }).isRequired,
    onLocationValueChanged: PropTypes.func.isRequired,
    onInputValueChanged: PropTypes.func.isRequired,
    onImageSelected: PropTypes.func.isRequired,
    onImageCleared: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default LostDogDetails;