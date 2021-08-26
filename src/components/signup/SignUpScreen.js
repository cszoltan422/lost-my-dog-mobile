import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ScrollView, Text, TextInput, Dimensions} from 'react-native';
import HeaderMenu from '../menu/HeaderMenu';
import {Button, Icon, Tooltip} from 'react-native-elements';
import {connect} from 'react-redux';
import { SIGN_UP_SCREEN_TITLE } from '../../i18n/i18n.keys';
import i18n from '../../i18n/i18n';
import colors from '../../colors';
import {APPLICATION_NAME} from '../../application.constants';
import {onSignupAttempted, onSignupInputValueChanged} from '../../redux/actions/signup/action-creators/action.creators';

class SignUpScreen extends Component {

    renderTextInputBox = (inputKey, onChangeText) => {
        return (
            <View style={styles.textInputBoxContainerStyle}>
                <Text
                    testID={this.props.inputs[inputKey].labelTestID}
                    style={styles.textInputLabelStyle}>
                    {i18n.t(this.props.inputs[inputKey].label)}
                </Text>
                <View style={[
                    styles.inputStyle,
                    !this.props.inputs[inputKey].isValid ? styles.errorInputStyle : null
                ]}>
                    <TextInput
                        testID={this.props.inputs[inputKey].inputTestID}
                        style={styles.inputTextStyle}
                        placeholder={i18n.t(this.props.inputs[inputKey].label)}
                        placeholderTextColor={colors.white}
                        value={this.props.inputs[inputKey].value}
                        autoCapitalize={this.props.inputs[inputKey].autoCapitalize}
                        secureTextEntry={this.props.inputs[inputKey].secureTextEntry}
                        onChangeText={onChangeText} />
                    {!this.props.inputs[inputKey].isValid ?
                        <View style={styles.errorToolTipContainerStyle}>
                            <Tooltip
                                width={Dimensions.get('window').width}
                                height={100}
                                backgroundColor={colors.grey}
                                popover={
                                    <Text
                                        testID={this.props.inputs[inputKey].errorTestID}
                                        style={styles.errorTooltipTextStyle}>
                                        {i18n.t(this.props.inputs[inputKey].validationErrorKey)}
                                    </Text>}>
                                <Icon name='report-problem' type='material' />
                            </Tooltip>
                        </View>
                        : null
                    }
                </View>
            </View>
        );
    };

    render() {
        return (
            <ScrollView
                testID='signup-screen-scroll-view'
                style={styles.scrollViewType}
                contentContainerStyle={styles.scrollViewContentContainerStyle}
                extraHeight={-64}>
                <View style={styles.container}>
                    <Text
                        testID='signup-screen-title-text'
                        style={styles.signUpTitleStyle}>
                        {APPLICATION_NAME}
                    </Text>
                    {Object.keys(this.props.inputs).map((inputKey) => {
                        return (
                            <Fragment key={inputKey}>
                                {this.renderTextInputBox(
                                    inputKey,
                                    (value) => this.props.onSignupInputValueChanged(inputKey, value)
                                )}
                            </Fragment>
                        );
                    })}
                    <View style={styles.signupButtonContainerStyle}>
                        {this.props.error ?
                            <Text
                                testID='signup-global-error-text'
                                style={styles.signupAttemptTextStyle}>
                                {i18n.t(this.props.error)}
                            </Text>
                            : null
                        }
                        <Button
                            testID='signup-screen-signup-button'
                            buttonStyle={styles.signupButtonStyle}
                            titleStyle={styles.signupTextStyle}
                            title={i18n.t(SIGN_UP_SCREEN_TITLE)}
                            loading={this.props.isLoading}
                            disabled={!this.props.isValid}
                            onPress={() => this.props.onSignupAttempted(this.props.navigation)} />
                    </View>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    scrollViewType: {
        flex: 1
    },
    scrollViewContentContainerStyle: {
        flexGrow: 1
    },
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
    textInputBoxContainerStyle: {
        flex: 1,
        width: '100%',
        marginBottom: 10,
        alignItems: 'center'
    },
    textInputLabelStyle: {
        marginEnd: 8,
        color: colors.accentColor,
        fontWeight: 'bold',
        alignSelf: 'center',
        width: '80%',
        marginStart: 20
    },
    inputStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        backgroundColor: colors.primaryColor,
        borderRadius: 25,
        height: 50,
        padding: 20
    },
    errorInputStyle: {
        backgroundColor: colors.errorRed,
        opacity: 0.9,
    },
    inputTextStyle: {
        flex: 1,
        height: 50,
        color: colors.white
    },
    errorToolTipContainerStyle: {
        height: 50,
        alignSelf: 'flex-start',
        marginTop: -10
    },
    errorTooltipTextStyle: {
        color: colors.white
    },
    signupButtonContainerStyle: {
        marginTop: 20,
        marginBottom: 20,
        alignItems:'center',
        justifyContent:'center',
    },
    signupAttemptTextStyle: {
        color: colors.errorRed,
        fontWeight: 'bold'
    },
    signupButtonStyle: {
        width: 200,
        backgroundColor: colors.accentColor,
        borderRadius: 25,
        height: 50,
        textAlign: 'center'
    },
    signupTextStyle: {
        color: colors.white,
        fontSize: 18,
    },
});

SignUpScreen['navigationOptions'] = ({ navigation }) => ({
    title: i18n.t(SIGN_UP_SCREEN_TITLE),
    headerBackTitleVisible: false,
    headerRight: () => <HeaderMenu navigation={navigation} /> // eslint-disable-line
});

SignUpScreen.propTypes = {
    isValid: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    inputs: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    onSignupInputValueChanged: PropTypes.func.isRequired,
    onSignupAttempted: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        isValid: state.signup.isValid,
        isLoading: state.signup.isLoading,
        error: state.signup.error,
        inputs: state.signup.inputs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignupInputValueChanged: (inputKey, value) => dispatch(onSignupInputValueChanged(inputKey, value)),
        onSignupAttempted: (navigation) => dispatch(onSignupAttempted(navigation))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);