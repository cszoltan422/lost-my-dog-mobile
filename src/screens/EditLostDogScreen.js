import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import LostDogDetails from '../components/lost-dog-details/LostDogDetails';
import Toast from 'react-native-toast-message';
import {TOAST_ERROR_HEADER_TEXT} from '../i18n/i18n.keys';
import i18n from '../i18n/i18n';
import {
    onResetSubmitForm, onSubmitFormChangeMode, onSubmitFormHideAlert, onSubmitFormImageCleared,
    onSubmitFormImageSelected,
    onSubmitFormInputValueChanged,
    onSubmitFormLocationValueChanged, onSubmitFormSetDogId,
    onSubmitFormSubmitted
} from '../redux/actions/submit-form/action-creators/action.creators';
import {useComponentDidMount} from '../hooks/useComponentDidMount';
import {useComponentWillUnmount} from '../hooks/useComponentWillUnmount';
import {
    DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS,
    DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS,
    EDIT_DOG_NAVIGATION_SCREEN_NAME,
    ERROR_MESSAGE_TRANSLATION_CODES,
    SUBMIT_FORM_AGE_TEXT_INPUT_KEY,
    SUBMIT_FORM_BREED_TEXT_INPUT_KEY,
    SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY,
    SUBMIT_FORM_COLOR_TEXT_INPUT_KEY, SUBMIT_FORM_CREATE_MODE,
    SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY, SUBMIT_FORM_EDIT_MODE, SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY,
    SUBMIT_FORM_NAME_TEXT_INPUT_KEY,
    SUBMIT_FORM_SEX_SELECT_INPUT_KEY, SUBMIT_FORM_STATUS_SELECT_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY
} from '../application.constants';
import ENV from "../environmnent.config";

const EditLostDogScreen = (props) => {

    const isValid = useSelector(state => state.submitForm.isValid);
    const isLoading = useSelector(state => state.submitForm.isLoading);
    const loading = useSelector(state => state.submitForm.loading);
    const error = useSelector(state => state.submitForm.error);
    const inputs = useSelector(state => state.submitForm.inputs);
    const location = useSelector(state => state.submitForm.location);
    const selectedImage = useSelector(state => state.submitForm.selectedImage);

    const dog = props.navigation.getParam(EDIT_DOG_NAVIGATION_SCREEN_NAME);

    const dispatch = useDispatch();

    useComponentDidMount(() => {
        dispatch(onSubmitFormSetDogId(dog.id));
        dispatch(onSubmitFormLocationValueChanged({
            longitude: dog.longitude,
            latitude: dog.latitude
        }));
        dispatch(onSubmitFormImageSelected(`${ENV.API_URL}/api/image/${dog.avatarFilename}`));

        dispatch(onSubmitFormInputValueChanged(SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY, dog.description));
        dispatch(onSubmitFormInputValueChanged(SUBMIT_FORM_NAME_TEXT_INPUT_KEY, dog.dogName));
        dispatch(onSubmitFormInputValueChanged(SUBMIT_FORM_BREED_TEXT_INPUT_KEY, dog.dogBreed));
        dispatch(onSubmitFormInputValueChanged(SUBMIT_FORM_SEX_SELECT_INPUT_KEY, DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS[dog.gender]));
        dispatch(onSubmitFormInputValueChanged(SUBMIT_FORM_COLOR_TEXT_INPUT_KEY, dog.color));
        dispatch(onSubmitFormInputValueChanged(SUBMIT_FORM_STATUS_SELECT_INPUT_KEY, DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS[dog.status]));
        dispatch(onSubmitFormInputValueChanged(SUBMIT_FORM_AGE_TEXT_INPUT_KEY, `${dog.age}`));
        dispatch(onSubmitFormInputValueChanged(SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY, dog.chippedStatus === 'YES'));
        dispatch(onSubmitFormInputValueChanged(SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY, dog.chipNumber));
        dispatch(onSubmitFormInputValueChanged(SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY, dog.contactEmail));
        dispatch(onSubmitFormInputValueChanged(SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY, dog.contactPhone));

        dispatch(onSubmitFormChangeMode(SUBMIT_FORM_EDIT_MODE)); // order matters, check submit-screen.reducer.js
    });

    useComponentWillUnmount(() => {
        dispatch(onSubmitFormChangeMode(SUBMIT_FORM_CREATE_MODE));
        dispatch(onResetSubmitForm());
    });

    useEffect(() => {
        if (error.show) {
            Toast.show({
                position: 'bottom',
                type: 'error',
                text1: i18n.t(TOAST_ERROR_HEADER_TEXT),
                text2: i18n.t(ERROR_MESSAGE_TRANSLATION_CODES[error.message] || 'ERROR_UNKNOWN_SERVER_ERROR'),
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
            dog={dog}
            onInputValueChanged={(inputKey, value) => dispatch(onSubmitFormInputValueChanged(inputKey, value))}
            onLocationValueChanged={(coordinates) => dispatch(onSubmitFormLocationValueChanged(coordinates))}
            onImageSelected={(selectedImageUri) => dispatch(onSubmitFormImageSelected(selectedImageUri))}
            onImageCleared={() => dispatch(onSubmitFormImageCleared())}
            onSubmit={() => dispatch(onSubmitFormSubmitted(props.navigation))} />
    );
};

EditLostDogScreen['navigationOptions'] = ({ navigation }) => ({
    title: navigation.getParam(EDIT_DOG_NAVIGATION_SCREEN_NAME).dogName,
    headerBackTitleVisible: false,
});

EditLostDogScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default EditLostDogScreen;