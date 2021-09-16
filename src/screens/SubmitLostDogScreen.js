import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeaderMenu from '../components/menu/HeaderMenu';
import LostDogDetails from '../components/lost-dog-details/LostDogDetails';
import {SUBMIT_DOG_TITLE} from '../i18n/i18n.keys';
import i18n from '../i18n/i18n';
import {
    onSubmitFormInputValueChanged,
    onSubmitFormLocationValueChanged
} from '../redux/actions/submit-form/action-creators/action.creators';
import {getLocation} from '../util/location/location.utils';

const SubmitLostDogScreen = () => {

    const isValid = useSelector(state => state.submitForm.isValid);
    const isLoading = useSelector(state => state.submitForm.isLoading);
    const error = useSelector(state => state.submitForm.error);
    const inputs = useSelector(state => state.submitForm.inputs);
    const location = useSelector(state => state.submitForm.location);

    const dispatch = useDispatch();

    useEffect(() => {
        async function getCurrentLocation() {let currentLocation = await getLocation();
            dispatch(onSubmitFormLocationValueChanged({
                longitude: currentLocation.coords.longitude,
                latitude: currentLocation.coords.latitude
            }));
        }
        getCurrentLocation();
    }, []);

    return (
        <LostDogDetails
            isValid={isValid}
            isLoading={isLoading}
            error={error}
            inputs={inputs}
            location={location}
            onSubmitFormInputValueChanged={(inputKey, value) => dispatch(onSubmitFormInputValueChanged(inputKey, value))}
            onSubmitFormLocationValueChanged={(coordinates) => dispatch(onSubmitFormLocationValueChanged(coordinates))} />
    );

}

SubmitLostDogScreen['navigationOptions'] = ({ navigation }) => ({
    title: i18n.t(SUBMIT_DOG_TITLE),
    headerRight: () => <HeaderMenu navigation={navigation} /> // eslint-disable-line
});

export default SubmitLostDogScreen;