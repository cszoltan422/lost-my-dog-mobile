import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {
    onLoginAttempted,
    onLoginPasswordChanged,
    onLoginUsernameChanged
} from '../redux/actions/login/action-creators/action.creators';
import i18n from '../i18n/i18n';
import colors from '../colors';
import {
    LOGIN_FORGOT_PASSWORD_PLACEHOLDER, LOGIN_LOGIN_TEXT,
    LOGIN_PASSWORD_PLACEHOLDER, LOGIN_SIGN_UP_TEXT,
    LOGIN_USERNAME_PLACEHOLDER
} from '../i18n/i18n.keys';
import {APPLICATION_NAME, SIGN_UP_NAVIGATION_SCREEN_NAME} from '../application.constants';

const LoginScreen = (props) => {

    const username = useSelector(state => state.login.username);
    const password = useSelector(state => state.login.password);
    const loading = useSelector(state => state.login.loading);
    const error = useSelector(state => state.login.error);

    const dispatch = useDispatch();

    const emptyInput = () => {
        return !username || !password;
    };

    return (
        <View style={styles.container}>
            <Text
                testID='login-screen-application-name-text'
                style={styles.logoStyle}>
                {APPLICATION_NAME}
            </Text>
            {error ?
                <Text
                    testID='login-screen-login-error-text'
                    style={styles.errorMessageStyle}>
                    {i18n.t(error)}
                </Text>
                : null}
            <View style={styles.inputStyle} >
                <TextInput
                    testID='login-screen-username-text-input'
                    style={styles.inputTextStyle}
                    placeholder={i18n.t(LOGIN_USERNAME_PLACEHOLDER)}
                    placeholderTextColor={colors.white}
                    value={username}
                    autoCapitalize='none'
                    onChangeText={(username) => dispatch(onLoginUsernameChanged(username))} />
            </View>
            <View style={styles.inputStyle} >
                <TextInput
                    testID='login-screen-password-text-input'
                    secureTextEntry
                    style={styles.inputTextStyle}
                    placeholder={i18n.t(LOGIN_PASSWORD_PLACEHOLDER)}
                    placeholderTextColor={colors.white}
                    value={password}
                    autoCapitalize='none'
                    onChangeText={password => dispatch(onLoginPasswordChanged(password))} />
            </View>
            <TouchableOpacity>
                <Text
                    testID='login-screen-forgot-password-text'
                    style={styles.forgotPasswordStyle}>
                    {i18n.t(LOGIN_FORGOT_PASSWORD_PLACEHOLDER)}
                </Text>
            </TouchableOpacity>
            <Button
                testID='login-screen-login-button'
                buttonStyle={styles.loginButtonStyle}
                titleStyle={styles.loginTextStyle}
                title={i18n.t(LOGIN_LOGIN_TEXT)}
                loading={loading}
                disabled={loading || emptyInput()}
                onPress={() => dispatch(onLoginAttempted(props.navigation))} />
            <TouchableOpacity
                onPress={() => props.navigation.navigate(SIGN_UP_NAVIGATION_SCREEN_NAME)}>
                <Text
                    testID='login-screen-signup-text'
                    style={styles.signUpTextStyle}>
                    {i18n.t(LOGIN_SIGN_UP_TEXT)}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle :{
        fontWeight: 'bold',
        fontSize: 50,
        color: colors.accentColor,
        marginBottom: 40
    },
    errorMessageStyle: {
        color: colors.errorRed,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
    },
    inputStyle: {
        width: '80%',
        backgroundColor: colors.primaryColor,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20
    },
    inputTextStyle: {
        height: 50,
        color: colors.white
    },
    forgotPasswordStyle: {
        color: colors.accentColor
    },
    loginButtonStyle: {
        width: 200,
        backgroundColor: colors.accentColor,
        borderRadius: 25,
        height: 50,
        alignItems:'center',
        justifyContent:'center',
        marginTop: 40,
        marginBottom: 10,
        textAlign: 'center'
    },
    loginTextStyle: {
        color: colors.white,
        fontSize: 18,
    },
    signUpTextStyle: {
        color: colors.accentColor,
        fontSize: 16
    }
});

LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default LoginScreen;