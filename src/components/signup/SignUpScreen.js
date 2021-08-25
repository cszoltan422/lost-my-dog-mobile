import React, { Component, Fragment } from 'react';
import {View, StyleSheet, ScrollView, Text, TextInput} from 'react-native';
import HeaderMenu from '../menu/HeaderMenu';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {
    SIGN_UP_SCREEN_TITLE
} from '../../i18n/i18n.keys';
import i18n from '../../i18n/i18n';
import colors from '../../colors';
import {APPLICATION_NAME} from '../../application.constants';
import {onSignupAttempted, onSignupInputValueChanged} from '../../redux/actions/signup/action-creators/action.creators';

class SignUpScreen extends Component {

    renderTextInputBox = (textInputParams) => {
        return (
            <View style={{flex: 1, width: '100%', marginBottom: 10, alignItems: 'center'}}>
                <Text
                    testID={textInputParams.labelTestID}
                    style={{marginEnd: 8, color: colors.accentColor, fontWeight: 'bold', alignSelf: 'center', width: '80%', marginStart: 20}}>
                    {textInputParams.label}
                </Text>
                <View style={styles.inputStyle}>
                    <TextInput
                        testID={textInputParams.inputTestID}
                        style={styles.inputTextStyle}
                        placeholder={textInputParams.label}
                        placeholderTextColor={colors.white}
                        value={textInputParams.value}
                        autoCapitalize={textInputParams.autoCapitalize}
                        secureTextEntry={textInputParams.secureTextEntry}
                        onChangeText={textInputParams.onChangeText} />
                </View>
            </View>
        );
    };

    render() {
        return (
            <ScrollView style={{flex: 1}} extraHeight={-64} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text
                        testID='signup-screen-title-text'
                        style={styles.signUpTitleStyle}>
                        {APPLICATION_NAME}
                    </Text>
                    {Object.keys(this.props.inputs).map((inputKey) => {
                        return (
                            <Fragment key={inputKey}>
                                {this.renderTextInputBox({
                                    labelTestID: this.props.inputs[inputKey].labelTestID,
                                    inputTestID: this.props.inputs[inputKey].inputTestID,
                                    label: i18n.t(this.props.inputs[inputKey].label),
                                    value: this.props.inputs[inputKey].value,
                                    autoCapitalize: this.props.inputs[inputKey].autoCapitalize,
                                    secureTextEntry: this.props.inputs[inputKey].secureTextEntry,
                                    autoCompleteType: this.props.inputs[inputKey].autoCompleteType,
                                    keyboardType: this.props.inputs[inputKey].keyboardType,
                                    onChangeText: (value) => this.props.onSignupInputValueChanged(inputKey, value),
                                })}
                            </Fragment>
                        );
                    })}
                    <Button
                        testID='signup-screen-signup-button'
                        buttonStyle={styles.loginButtonStyle}
                        titleStyle={styles.loginTextStyle}
                        title={i18n.t(SIGN_UP_SCREEN_TITLE)}
                        onPress={() => this.props.onSignupAttempted()} />
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpTitleStyle :{
        fontWeight: 'bold',
        fontSize: 50,
        color: colors.accentColor,
        marginBottom: 40,
        marginTop: 40,
    },
    inputStyle: {
        width: '80%',
        backgroundColor: colors.primaryColor,
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        padding: 20
    },
    inputTextStyle: {
        height: 50,
        color: colors.white
    },
    loginButtonStyle: {
        width: 200,
        backgroundColor: colors.accentColor,
        borderRadius: 25,
        height: 50,
        alignItems:'center',
        justifyContent:'center',
        marginTop: 40,
        marginBottom: 20,
        textAlign: 'center'
    },
    loginTextStyle: {
        color: colors.white,
        fontSize: 18,
    },
});

SignUpScreen['navigationOptions'] = ({ navigation }) => ({
    title: i18n.t(SIGN_UP_SCREEN_TITLE),
    headerBackTitleVisible: false,
    headerRight: () => <HeaderMenu navigation={navigation} /> // eslint-disable-line
});

const mapStateToProps = (state) => {
    return {
        isValid: state.signup.isValid,
        isLoading: state.signup.isLoading,
        error: state.signup.error,
        inputs: state.signup.inputs,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignupInputValueChanged: (inputKey, value) => dispatch(onSignupInputValueChanged(inputKey, value)),
        onSignupAttempted: () => dispatch(onSignupAttempted())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);