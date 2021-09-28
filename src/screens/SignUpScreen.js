import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {View, StyleSheet, ScrollView, Text, TextInput, Dimensions} from 'react-native';
import {Button, Icon, Tooltip} from 'react-native-elements';
import { SIGN_UP_SCREEN_TITLE } from '../i18n/i18n.keys';
import i18n from '../i18n/i18n';
import colors from '../colors';
import {APPLICATION_NAME} from '../application.constants';
import {onSignupAttempted, onSignupInputValueChanged} from '../redux/actions/signup/action-creators/action.creators';

const SignUpScreen = (props) => {

    const isValid = useSelector(state => state.signup.isValid);
    const isLoading = useSelector(state => state.signup.isLoading);
    const error = useSelector(state => state.signup.error);
    const inputs = useSelector(state => state.signup.inputs);

    const dispatch = useDispatch();

    const renderTextInputBox = (inputKey, onChangeText) => {
        return (
            <View style={styles.textInputBoxContainerStyle}>
                <Text
                    testID={inputs[inputKey].labelTestID}
                    style={styles.textInputLabelStyle}>
                    {i18n.t(inputs[inputKey].label)}
                </Text>
                <View style={[
                    styles.inputStyle,
                    !inputs[inputKey].isValid ? styles.errorInputStyle : null
                ]}>
                    <TextInput
                        testID={inputs[inputKey].inputTestID}
                        style={styles.inputTextStyle}
                        placeholder={i18n.t(inputs[inputKey].label)}
                        placeholderTextColor={colors.white}
                        value={inputs[inputKey].value}
                        autoCapitalize={inputs[inputKey].autoCapitalize}
                        secureTextEntry={inputs[inputKey].secureTextEntry}
                        onChangeText={onChangeText} />
                    {!inputs[inputKey].isValid ?
                        <View style={styles.errorToolTipContainerStyle}>
                            <Tooltip
                                width={Dimensions.get('window').width}
                                height={100}
                                backgroundColor={colors.grey}
                                popover={
                                    <Text
                                        testID={inputs[inputKey].errorLabelTestID}
                                        style={styles.errorTooltipTextStyle}>
                                        {i18n.t(inputs[inputKey].validationErrorKey)}
                                    </Text>}>
                                <Icon
                                    testID={inputs[inputKey].errorIconTestID}
                                    name='report-problem'
                                    type='material' />
                            </Tooltip>
                        </View>
                        : null
                    }
                </View>
            </View>
        );
    };

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
                {Object.keys(inputs).map((inputKey) => {
                    return (
                        <Fragment key={inputKey}>
                            {renderTextInputBox(
                                inputKey,
                                (value) => dispatch(onSignupInputValueChanged(inputKey, value))
                            )}
                        </Fragment>
                    );
                })}
                <View style={styles.signupButtonContainerStyle}>
                    {error && (
                        <Text
                            testID='signup-global-error-text'
                            style={styles.signupAttemptTextStyle}>
                            {i18n.t(error)}
                        </Text>
                    )}
                    <Button
                        testID='signup-screen-signup-button'
                        buttonStyle={styles.signupButtonStyle}
                        titleStyle={styles.signupTextStyle}
                        title={i18n.t(SIGN_UP_SCREEN_TITLE)}
                        loading={isLoading}
                        disabled={!isValid}
                        onPress={() => dispatch(onSignupAttempted(props.navigation))} />
                </View>
            </View>
        </ScrollView>
    );

};

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

SignUpScreen['navigationOptions'] = () => ({
    title: i18n.t(SIGN_UP_SCREEN_TITLE),
    headerBackTitleVisible: false
});

SignUpScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default SignUpScreen;