import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {
    onLoginAttempted,
    onLoginPasswordChanged,
    onLoginUsernameChanged
} from '../../redux/actions/login/action-creators/action.creators';
import i18n from '../../i18n/i18n';
import colors from '../../colors';
import {
    LOGIN_FORGOT_PASSWORD_PLACEHOLDER, LOGIN_LOGIN_TEXT,
    LOGIN_PASSWORD_PLACEHOLDER, LOGIN_SIGN_UP_TEXT,
    LOGIN_USERNAME_PLACEHOLDER
} from '../../i18n/i18n.keys';

class LoginScreen extends Component {

    emptyInput = () => {
        return !this.props.username || !this.props.password;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logoStyle}>LostMyDog</Text>
                {this.props.error ?
                    <Text style={styles.errorMessageStyle}>
                        {i18n.t(this.props.error)}
                    </Text>
                    : null}
                <View style={styles.inputStyle} >
                    <TextInput
                        style={styles.inputTextStyle}
                        placeholder={i18n.t(LOGIN_USERNAME_PLACEHOLDER)}
                        placeholderTextColor={colors.white}
                        value={this.props.username}
                        autoCapitalize='none'
                        onChangeText={(username) => this.props.onLoginUsernameChanged(username)} />
                </View>
                <View style={styles.inputStyle} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputTextStyle}
                        placeholder={i18n.t(LOGIN_PASSWORD_PLACEHOLDER)}
                        placeholderTextColor={colors.white}
                        value={this.props.password}
                        autoCapitalize='none'
                        onChangeText={password => this.props.onLoginPasswordChanged(password)} />
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgotPasswordStyle}>
                        {i18n.t(LOGIN_FORGOT_PASSWORD_PLACEHOLDER)}
                    </Text>
                </TouchableOpacity>
                <Button
                    buttonStyle={styles.loginButtonStyle}
                    titleStyle={styles.loginTextStyle}
                    title={i18n.t(LOGIN_LOGIN_TEXT)}
                    loading={this.props.loading}
                    disabled={this.props.loading || this.emptyInput()}
                    onPress={() => this.props.onLoginAttempted(this.props.navigation)} />
                <TouchableOpacity>
                    <Text style={styles.signUpTextStyle}>
                        {i18n.t(LOGIN_SIGN_UP_TEXT)}
                    </Text>
                </TouchableOpacity>
            </View>
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
        padding: 20,
        opacity: 0.7
    },
    inputTextStyle: {
        height: 50,
        color: colors.white
    },
    forgotPasswordStyle: {
        color: colors.accentColor
    },
    loginButtonStyle: {
        width: '100%',
        backgroundColor: colors.accentColor,
        borderRadius: 25,
        height: 50,
        alignItems:'center',
        justifyContent:'center',
        marginTop: 40,
        marginBottom: 10
    },
    loginTextStyle: {
        color: colors.white,
        fontSize: 18
    },
    signUpTextStyle: {
        color: colors.accentColor,
        fontSize: 16
    }
});

LoginScreen['navigationOptions'] = () => ({
    title: i18n.t(LOGIN_LOGIN_TEXT),
    headerBackTitleVisible: false,
});

LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    onLoginAttempted: PropTypes.func.isRequired,
    onLoginUsernameChanged: PropTypes.func.isRequired,
    onLoginPasswordChanged: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        username: state.login.username,
        password: state.login.password,
        loading: state.login.loading,
        error: state.login.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginUsernameChanged: (username) => dispatch(onLoginUsernameChanged(username)),
        onLoginPasswordChanged: (password) => dispatch(onLoginPasswordChanged(password)),
        onLoginAttempted: (navigation) => dispatch(onLoginAttempted(navigation))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);