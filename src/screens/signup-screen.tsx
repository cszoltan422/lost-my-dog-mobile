import React, { Fragment } from 'react';
import {View, StyleSheet, ScrollView, Text, TextInput, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import i18n from '../i18n/i18n';
import colors from '../colors';
import {APPLICATION_NAME, SIGNUP_ERROR_TRANSLATION_KEYS} from '../application.constants';
import {onSignupAttempted, onSignupInputValueChanged} from '../redux/actions/signup/action-creators/action-creators';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {Icon, Tooltip} from '@rneui/base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/navigation/lost-my-dog-navigator';

type IProps = NativeStackScreenProps<RootStackParamList, 'SignupScreen'>;

const SignupScreen = (props: IProps) => {
    const isValid = useAppSelector(state => state.signup.isValid);
    const isLoading = useAppSelector(state => state.signup.isLoading);
    const error = useAppSelector(state => state.signup.error);
    const inputs = useAppSelector(state => state.signup.inputs);

    const dispatch = useAppDispatch();

    const renderTextInputBox = (inputKey: string, onChangeText: (text: string) => void) => {
        const input = inputs.get(inputKey);
        if (input) {
            return (
                <View style={styles.textInputBoxContainerStyle}>
                    <Text
                        testID={input.labelTestID}
                        style={styles.textInputLabelStyle}>
                        {i18n.t(input.label)}
                    </Text>
                    <View style={[
                        styles.inputStyle,
                        !input.isValid ? styles.errorInputStyle : null
                    ]}>
                        <TextInput
                            testID={input.inputTestID}
                            style={styles.inputTextStyle}
                            placeholder={i18n.t(input.label)}
                            placeholderTextColor={colors.white}
                            value={input.value}
                            autoCapitalize={input.autoCapitalize}
                            secureTextEntry={input.secureTextEntry}
                            onChangeText={onChangeText} />
                        {!input.isValid ?
                            <View style={styles.errorToolTipContainerStyle}>
                                <Tooltip
                                    width={Dimensions.get('window').width}
                                    height={150}
                                    backgroundColor={colors.grey}
                                    popover={
                                        <Text
                                            testID={input.errorLabelTestID}
                                            style={styles.errorTooltipTextStyle}>
                                            {i18n.t(input.validationErrorKey)}
                                        </Text>}>
                                    <Icon
                                        testID={input.errorIconTestID}
                                        name='report-problem'
                                        type='material' />
                                </Tooltip>
                            </View>
                            : null
                        }
                    </View>
                </View>
            );
        } else {
            return null;
        }
    };

    return (
        <ScrollView
            testID='signup-screen-scroll-view'
            style={styles.scrollViewType}
            contentContainerStyle={styles.scrollViewContentContainerStyle}>
            <View style={styles.container}>
                <Text
                    testID='signup-screen-title-text'
                    style={styles.signUpTitleStyle}>
                    {APPLICATION_NAME}
                </Text>
                {Array.from(inputs).map(([inputKey]) => {
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
                    {error !== '' && (
                        <Text
                            testID='signup-global-error-text'
                            style={styles.signupAttemptTextStyle}>
                            {i18n.t(SIGNUP_ERROR_TRANSLATION_KEYS.get(error) || '')}
                        </Text>
                    )}
                    <Button
                        testID='signup-screen-signup-button'
                        buttonStyle={styles.signupButtonStyle}
                        titleStyle={styles.signupTextStyle}
                        title={i18n.t('general.signUp')}
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

export default SignupScreen;