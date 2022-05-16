import React, {useEffect} from 'react';
import LostDogDetails from '../components/lost-dog-details/lost-dog-details';
import Toast from 'react-native-toast-message';
import i18n from '../i18n/i18n';
import {useComponentDidMount} from '../hooks/useComponentDidMount';
import {useComponentWillUnmount} from '../hooks/useComponentWillUnmount';
import {ERROR_MESSAGE_TRANSLATION_CODES} from '../application.constants';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/navigation/lost-my-dog-navigator';
import {
    resetSubmitForm, setSubmitFormError, submitFormClearImage,
    submitFormImageChange,
    submitFormInputChange, submitFormLocationChange, submitFormSubmit
} from '../redux/reducers/submit-form/submit-form-reducer';

type IProps = NativeStackScreenProps<RootStackParamList, 'SubmitLostDogScreen'>;

const SubmitLostDogScreen = (props: IProps) => {
    const isValid = useAppSelector(state => state.submitForm.isValid);
    const isLoading = useAppSelector(state => state.submitForm.isLoading);
    const loading = useAppSelector(state => state.submitForm.loading);
    const error = useAppSelector(state => state.submitForm.error);
    const inputs = useAppSelector(state => state.submitForm.inputs);
    const location = useAppSelector(state => state.submitForm.location);
    const selectedImage = useAppSelector(state => state.submitForm.selectedImage);
    const currentLocation = useAppSelector(state => state.application.location);

    const dispatch = useAppDispatch();

    useComponentDidMount(() => {
        dispatch(submitFormLocationChange({
            longitude: currentLocation.longitude,
            latitude: currentLocation.latitude
        }));
    });

    useComponentWillUnmount(() => {
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

export default SubmitLostDogScreen;