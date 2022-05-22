import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import i18n from '../i18n/i18n';
import colors from '../colors';
import {APPLICATION_NAME} from '../application.constants';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/navigation/lost-my-dog-navigator';
import {loginAttempt, setLoginPassword, setLoginUsername} from '../redux/reducers/login/login-reducer';

export type LoginScreen = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen = (props: LoginScreen) => {
    const username = useAppSelector(state => state.login.username);
    const password = useAppSelector(state => state.login.password);
    const loading = useAppSelector(state => state.login.loading);
    const error = useAppSelector(state => state.login.error);

    const dispatch = useAppDispatch();

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
                    placeholder={`${i18n.t('general.username')}...`}
                    placeholderTextColor={colors.white}
                    value={username}
                    autoCapitalize='none'
                    onChangeText={(username) => dispatch(setLoginUsername(username))} />
            </View>
            <View style={styles.inputStyle} >
                <TextInput
                    testID='login-screen-password-text-input'
                    secureTextEntry
                    style={styles.inputTextStyle}
                    placeholder={`${i18n.t('general.password')}...`}
                    placeholderTextColor={colors.white}
                    value={password}
                    autoCapitalize='none'
                    onChangeText={password => dispatch(setLoginPassword(password))} />
            </View>
            <TouchableOpacity>
                <Text
                    testID='login-screen-forgot-password-text'
                    style={styles.forgotPasswordStyle}>
                    {i18n.t('login.forgotPassword')}
                </Text>
            </TouchableOpacity>
            <Button
                testID='login-screen-login-button'
                buttonStyle={styles.loginButtonStyle}
                titleStyle={styles.loginTextStyle}
                title={i18n.t('general.login')}
                loading={loading}
                disabled={loading || emptyInput()}
                onPress={() => dispatch(loginAttempt(props.navigation))} />
            <TouchableOpacity
                onPress={() => props.navigation.navigate('SignupScreen')}>
                <Text
                    testID='login-screen-signup-text'
                    style={styles.signUpTextStyle}>
                    {i18n.t('general.signUp')}
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

export default LoginScreen;