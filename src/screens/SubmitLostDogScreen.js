import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import LostDogDetails from '../components/lost-dog-details/LostDogDetails';
import {SUBMIT_DOG_TITLE} from '../i18n/i18n.keys';
import i18n from '../i18n/i18n';
import {
    onResetSubmitForm, onSubmitFormImageCleared,
    onSubmitFormImageSelected,
    onSubmitFormInputValueChanged,
    onSubmitFormLocationValueChanged,
    onSubmitFormSubmitted
} from '../redux/actions/submit-form/action-creators/action.creators';
import {useComponentDidMount} from "../hooks/useComponentDidMount";

const SubmitLostDogScreen = (props) => {

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

    useEffect(() => {
        return () => {
            dispatch(onResetSubmitForm());
        };
    }, []);

    return (
        <LostDogDetails
            isValid={isValid}
            isLoading={isLoading}
            loading={loading}
            error={error}
            inputs={inputs}
            location={location}
            selectedImage={selectedImage}
            onInputValueChanged={(inputKey, value) => dispatch(onSubmitFormInputValueChanged(inputKey, value))}
            onLocationValueChanged={(coordinates) => dispatch(onSubmitFormLocationValueChanged(coordinates))}
            onImageSelected={(selectedImageUri) => dispatch(onSubmitFormImageSelected(selectedImageUri))}
            onImageCleared={() => dispatch(onSubmitFormImageCleared())}
            onSubmit={() => dispatch(onSubmitFormSubmitted(props.navigation))} />
    );

};

SubmitLostDogScreen['navigationOptions'] = () => ({
    title: i18n.t(SUBMIT_DOG_TITLE)
});

SubmitLostDogScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default SubmitLostDogScreen;