import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import Card from '../common/card/card';
import LocationPicker from '../common/location-picker/location-picker';
import LostDogDetailsHeader from './header/lost-dog-details-header';
import LostDogDetailsContent from './content/lost-dog-details-content';
import i18n from '../../i18n/i18n';
import colors from '../../colors';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';
import {
    submitFormClearImage,
    submitFormImageChange,
    submitFormInputChange, submitFormLocationChange, submitFormSubmit
} from '../../redux/reducers/submit-form/submit-form-reducer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/lost-my-dog-navigator';

interface IProps {
    navigationProps: NativeStackScreenProps<RootStackParamList, 'SubmitLostDogScreen' | 'EditLostDogScreen'>;
}

const LostDogDetails = (props: IProps) => {
    const isValid = useAppSelector(state => state.submitForm.isValid);
    const isLoading = useAppSelector(state => state.submitForm.isLoading);
    const loading = useAppSelector(state => state.submitForm.loading);
    const inputs = useAppSelector(state => state.submitForm.inputs);
    const location = useAppSelector(state => state.submitForm.location);
    const selectedImage = useAppSelector(state => state.submitForm.selectedImage);

    const { navigationProps } = props;

    const dispatch = useAppDispatch();

    return (
        <ScrollView
            testID='details-screen-scroll-view' >
            <View
                testID='details-screen-container'
                style={styles.container}>
                <LostDogDetailsHeader
                    selectedImage={selectedImage}
                    onImageSelected={(selectedImageUri) => dispatch(submitFormImageChange(selectedImageUri))}
                    onImageCleared={() => dispatch(submitFormClearImage())} />
                <LostDogDetailsContent
                    isLoading={isLoading}
                    isValid={isValid}
                    inputs={inputs}
                    onInputValueChanged={(inputKey, value) => dispatch(submitFormInputChange({
                        inputKey: inputKey,
                        value: value
                    }))} />
                {location.isPresent && (
                    <Card>
                        <LocationPicker
                            longitude={location.longitude}
                            latitude={location.latitude}
                            markerTitle={i18n.t('general.lastSeenLocation')}
                            iconType='font-awesome'
                            iconName='paw'
                            iconSize={24}
                            iconColor={colors.accentColor}
                            onLocationValueChanged={(coordinates) => dispatch(submitFormLocationChange(coordinates))} />
                    </Card>
                )}
                <Card>
                    <>
                        <Button
                            testID='details-screen-submit-button'
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{color: colors.white}}
                            title={i18n.t('general.submit')}
                            loading={isLoading}
                            disabled={!isValid || isLoading}
                            onPress={() => dispatch(submitFormSubmit(navigationProps))} />
                        {isLoading && (
                            <View style={styles.loadingProgressContainer}>
                                <Text style={styles.loadingProgressInfoTextStyle}>
                                    {i18n.t('submitForm.loading.processing')}
                                </Text>
                                <Text style={styles.loadingProgressStageStyle}>
                                    {i18n.t(loading.stage)}
                                </Text>
                                <View style={styles.progressbarContainer}>
                                    <ProgressBar
                                        width={null}
                                        color={colors.accentColor}
                                        progress={loading.progress} />
                                </View>
                            </View>
                        )}
                    </>
                </Card>
            </View>
        </ScrollView>
    );
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

export default LostDogDetails;