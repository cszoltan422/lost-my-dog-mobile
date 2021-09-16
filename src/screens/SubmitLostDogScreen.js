import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeaderMenu from '../components/menu/HeaderMenu';
import LostDogDetails from '../components/lost-dog-details/LostDogDetails';
import {SUBMIT_DOG_TITLE} from '../i18n/i18n.keys';
import i18n from '../i18n/i18n';
import {onSubmitFormInputValueChanged} from '../redux/actions/submit-form/action-creators/action.creators';

const SubmitLostDogScreen = () => {

    const isValid = useSelector(state => state.submitForm.isValid);
    const isLoading = useSelector(state => state.submitForm.isLoading);
    const error = useSelector(state => state.submitForm.error);
    const inputs = useSelector(state => state.submitForm.inputs);

    const dispatch = useDispatch();

    return (
        <LostDogDetails
            isValid={isValid}
            isLoading={isLoading}
            error={error}
            inputs={inputs}
            onSubmitFormInputValueChanged={(inputKey, value) => dispatch(onSubmitFormInputValueChanged(inputKey, value))} />
    );

}

SubmitLostDogScreen['navigationOptions'] = ({ navigation }) => ({
    title: i18n.t(SUBMIT_DOG_TITLE),
    headerRight: () => <HeaderMenu navigation={navigation} /> // eslint-disable-line
});

export default SubmitLostDogScreen;