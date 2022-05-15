import React, {useEffect} from 'react';
import LostDogDetails from '../components/lost-dog-details/lost-dog-details';
import Toast from 'react-native-toast-message';
import i18n from '../i18n/i18n';
import {
    onResetSubmitForm, onSubmitFormHideAlert, onSubmitFormImageCleared,
    onSubmitFormImageSelected,
    onSubmitFormInputValueChanged,
    onSubmitFormLocationValueChanged,
    onSubmitFormSubmitted
} from '../redux/actions/submit-form/action-creators/action-creators';
import {useComponentDidMount} from '../hooks/useComponentDidMount';
import {useComponentWillUnmount} from '../hooks/useComponentWillUnmount';
import {ERROR_MESSAGE_TRANSLATION_CODES} from '../application.constants';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/navigation/lost-my-dog-navigator';

type IProps = NativeStackScreenProps<RootStackParamList, 'SubmitLostDogScreen'>;

const SubmitLostDogScreen = (props: IProps) => {
    const { route, navigation } = props;

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
                text2: i18n.t(ERROR_MESSAGE_TRANSLATION_CODES.get(error.message) || 'toast.unknownError'),
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

export default SubmitLostDogScreen;