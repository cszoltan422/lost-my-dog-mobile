import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import LostDogDetails from '../components/lost-dog-details/LostDogDetails';
import Toast from 'react-native-toast-message';
import i18n from '../i18n/i18n';
import {
    onResetSubmitForm, onSubmitFormHideAlert, onSubmitFormImageCleared,
    onSubmitFormImageSelected,
    onSubmitFormInputValueChanged,
    onSubmitFormLocationValueChanged,
    onSubmitFormSubmitted
} from '../redux/actions/submit-form/action-creators/action.creators';
import {useComponentDidMount} from '../hooks/useComponentDidMount';
import {useComponentWillUnmount} from '../hooks/useComponentWillUnmount';
import {ERROR_MESSAGE_TRANSLATION_CODES} from '../application.constants';

const SubmitLostDogScreen = ({ route, navigation }) => {

    const isValid = useSelector(state => state.submitForm.isValid);
    const isLoading = useSelector(state => state.submitForm.isLoading);
    const loading = useSelector(state => state.submitForm.loading);
    const error = useSelector(state => state.submitForm.error);
    const inputs = useSelector(state => state.submitForm.inputs);
    const location = useSelector(state => state.submitForm.location);
    const selectedImage = useSelector(state => state.submitForm.selectedImage);
    const currentLocation = useSelector(state => state.application.location);

    const dispatch = useDispatch();

    useComponentDidMount(() => {
        dispatch(onSubmitFormLocationValueChanged({
            longitude: currentLocation.longitude,
            latitude: currentLocation.latitude
        }));
    });

    useComponentWillUnmount(() => {
        dispatch(onResetSubmitForm());
    });

    useEffect(() => {
        if (error.show) {
            Toast.show({
                position: 'bottom',
                type: 'error',
                text1: i18n.t('toast.headerText'),
                text2: i18n.t(ERROR_MESSAGE_TRANSLATION_CODES[error.message] || 'toast.unknownError'),
                autoHide: false,
                onHide: () => dispatch(onSubmitFormHideAlert()),
            });
        }
    }, [error]);

    return (
        <LostDogDetails
            isValid={isValid}
            isLoading={isLoading}
            loading={loading}
            inputs={inputs}
            location={location}
            selectedImage={selectedImage}
            onInputValueChanged={(inputKey, value) => dispatch(onSubmitFormInputValueChanged(inputKey, value))}
            onLocationValueChanged={(coordinates) => dispatch(onSubmitFormLocationValueChanged(coordinates))}
            onImageSelected={(selectedImageUri) => dispatch(onSubmitFormImageSelected(selectedImageUri))}
            onImageCleared={() => dispatch(onSubmitFormImageCleared())}
            onSubmit={() => dispatch(onSubmitFormSubmitted(route, navigation))} />
    );

};

SubmitLostDogScreen.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default SubmitLostDogScreen;