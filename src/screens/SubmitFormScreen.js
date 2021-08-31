import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import HeaderMenu from '../components/menu/HeaderMenu';
import {
    SUBMIT_DOG_TITLE
} from '../i18n/i18n.keys';
import i18n from '../i18n/i18n';

class SubmitFormScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>SubmitFormScreen</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    }
});

SubmitFormScreen['navigationOptions'] = ({ navigation }) => ({
    title: i18n.t(SUBMIT_DOG_TITLE),
    headerRight: () => <HeaderMenu navigation={navigation} /> // eslint-disable-line
});

export default SubmitFormScreen;