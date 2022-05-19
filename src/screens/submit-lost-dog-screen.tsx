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
    resetSubmitForm,
    setSubmitFormError,
    submitFormLocationChange,
} from '../redux/reducers/submit-form/submit-form-reducer';

type IProps = NativeStackScreenProps<RootStackParamList, 'SubmitLostDogScreen'>;

const SubmitLostDogScreen = (props: IProps) => {
    const error = useAppSelector(state => state.submitForm.error);
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

    return <LostDogDetails navigationProps={props} />;

};

export default SubmitLostDogScreen;