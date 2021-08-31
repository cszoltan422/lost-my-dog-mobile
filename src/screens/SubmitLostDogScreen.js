import React, {Fragment} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import HeaderMenu from '../components/menu/HeaderMenu';
import {SUBMIT_DOG_TITLE} from '../i18n/i18n.keys';
import i18n from '../i18n/i18n';
import LostDogDetails from "../components/lost-dog-details/LostDogDetails";

const SubmitLostDogScreen = (props) => {

    return (
        <LostDogDetails isReadOnly={false} />
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    }
});

SubmitLostDogScreen['navigationOptions'] = ({ navigation }) => ({
    title: i18n.t(SUBMIT_DOG_TITLE),
    headerRight: () => <HeaderMenu navigation={navigation} /> // eslint-disable-line
});

export default SubmitLostDogScreen;