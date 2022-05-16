import React, {useEffect} from 'react';
import LostDogDetails from '../components/lost-dog-details/lost-dog-details';
import Toast from 'react-native-toast-message';
import i18n from '../i18n/i18n';
import {useComponentDidMount} from '../hooks/useComponentDidMount';
import {useComponentWillUnmount} from '../hooks/useComponentWillUnmount';
import {
    DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS,
    DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS,
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
import ENV from '../environmnent.config';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/navigation/lost-my-dog-navigator';
import {
    resetSubmitForm,
    setSubmitFormDogId, setSubmitFormError,
    setSubmitFormMode, submitFormClearImage,
    submitFormImageChange,
    submitFormInputChange, submitFormLocationChange, submitFormSubmit
} from '../redux/reducers/submit-form/submit-form-reducer';

type IProps = NativeStackScreenProps<RootStackParamList, 'EditLostDogScreen'>;

const EditLostDogScreen = (props: IProps) => {
    const { route } = props;
    const { dog } = route.params;

    const isValid = useAppSelector(state => state.submitForm.isValid);
    const isLoading = useAppSelector(state => state.submitForm.isLoading);
    const loading = useAppSelector(state => state.submitForm.loading);
    const error = useAppSelector(state => state.submitForm.error);
    const inputs = useAppSelector(state => state.submitForm.inputs);
    const location = useAppSelector(state => state.submitForm.location);
    const selectedImage = useAppSelector(state => state.submitForm.selectedImage);

    const dispatch = useAppDispatch();

    useComponentDidMount(() => {
        dispatch(setSubmitFormDogId(dog.id));
        dispatch(submitFormLocationChange({
            longitude: dog.longitude,
            latitude: dog.latitude
        }));
        dispatch(submitFormImageChange(`${ENV.API_URL}/api/image/${dog.avatarFilename}`));

        dispatch(submitFormInputChange({
            inputKey: SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY,
            value: dog.description
        }));
        dispatch(submitFormInputChange({
            inputKey: SUBMIT_FORM_NAME_TEXT_INPUT_KEY,
            value: dog.dogName
        }));
        dispatch(submitFormInputChange({
            inputKey: SUBMIT_FORM_BREED_TEXT_INPUT_KEY,
            value: dog.dogBreed
        }));
        dispatch(submitFormInputChange({
            inputKey: SUBMIT_FORM_SEX_SELECT_INPUT_KEY,
            value: DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS.get(dog.gender) || ''
        }));
        dispatch(submitFormInputChange({
            inputKey: SUBMIT_FORM_COLOR_TEXT_INPUT_KEY,
            value: dog.color
        }));
        dispatch(submitFormInputChange({
            inputKey: SUBMIT_FORM_STATUS_SELECT_INPUT_KEY,
            value: DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS.get(dog.status) || ''
        }));
        dispatch(submitFormInputChange({
            inputKey: SUBMIT_FORM_AGE_TEXT_INPUT_KEY,
            value: dog.age.toString()
        }));
        dispatch(submitFormInputChange({
            inputKey: SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY,
            value: dog.chippedStatus
        }));
        dispatch(submitFormInputChange({
            inputKey: SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY,
            value: dog.chipNumber
        }));
        dispatch(submitFormInputChange({
            inputKey: SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY,
            value: dog.contactEmail
        }));
        dispatch(submitFormInputChange({
            inputKey: SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY,
            value: dog.contactPhone
        }));

        dispatch(setSubmitFormMode(SUBMIT_FORM_EDIT_MODE)); // order matters, check submit-screen.reducer.js
    });

    useComponentWillUnmount(() => {
        dispatch(setSubmitFormMode(SUBMIT_FORM_CREATE_MODE));
        dispatch(resetSubmitForm());
    });

    useEffect(() => {
        if (error.show) {
            Toast.show({
                position: 'bottom',
                type: 'error',
                text1: i18n.t('toast.headerText'),
                text2: i18n.t(ERROR_MESSAGE_TRANSLATION_CODES.get(error.message) || 'toast.unknownError'),
                autoHide: false,
                onHide: () => dispatch(setSubmitFormError({
                    show: false,
                    code: 0,
                    message: ''
                })),
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
            onInputValueChanged={(inputKey, value) => dispatch(submitFormInputChange({
                inputKey: inputKey,
                value: value
            }))}
            onLocationValueChanged={(coordinates) => dispatch(submitFormLocationChange(coordinates))}
            onImageSelected={(selectedImageUri) => dispatch(submitFormImageChange(selectedImageUri))}
            onImageCleared={() => dispatch(submitFormClearImage())}
            onSubmit={() => dispatch(submitFormSubmit(props))} />
    );
};

export default EditLostDogScreen;