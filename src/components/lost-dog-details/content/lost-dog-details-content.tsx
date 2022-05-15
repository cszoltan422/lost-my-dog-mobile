import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput, View, Switch} from 'react-native';
import Card from '../../common/card/card';
import ModalDropdown from 'react-native-modal-dropdown';
import i18n from '../../../i18n/i18n';
import colors from '../../../colors';
import {
    SUBMIT_FORM_AGE_TEXT_INPUT_KEY,
    SUBMIT_FORM_BREED_TEXT_INPUT_KEY,
    SUBMIT_FORM_COLOR_TEXT_INPUT_KEY,
    SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY,
    SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY,
    SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY,
    SUBMIT_FORM_NAME_TEXT_INPUT_KEY,
    SUBMIT_FORM_SEX_SELECT_INPUT_KEY,
    SUBMIT_FORM_STATUS_SELECT_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY,
    SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY
} from '../../../application.constants';
import {
    SubmitFormInput,
    SubmitFormSelectInput,
    SubmitFormTextInput
} from '../../../redux/reducers/submit-form/submit-form-reducer';

interface IProps {
    isLoading: boolean;
    isValid: boolean;
    inputs: Map<string, SubmitFormInput>;
    onInputValueChanged: (inputKey: string, value: string | boolean) => void;
}

const LostDogDetailsContent = (props: IProps) => {

    const renderInput = (inputKey: string) => {
        const input = props.inputs.get(inputKey);
        if (input) {
            if ('options' in input) {
                return renderDropdown(inputKey, input);
            } else if ('keyboardType' in input) {
                return renderTextInput(inputKey, input);
            } else {
                return renderSwitch(inputKey, input);
            }
        } else {
            return null;
        }
    };

    const renderTextInput = (inputKey: string, input: SubmitFormTextInput) => {
        return (
            <>
                <Text
                    testID={input.labelTestID}
                    style={styles.labelTitle}>
                    {i18n.t(input.labelKey)}
                    {input.isRequired && '*'}
                </Text>
                <TextInput
                    testID={input.inputTestID}
                    style={styles.textInputStyle}
                    editable={!props.isLoading}
                    placeholder={`${i18n.t(input.labelKey)}...`}
                    keyboardType={input.keyboardType}
                    autoCapitalize={input.autoCapitalize}
                    contextMenuHidden={input.contextMenuHidden}
                    value={input.value}
                    onChangeText={(value) => props.onInputValueChanged(inputKey, value)} />
                {!input.isValid && (
                    <Text
                        testID={input.errorTestID}
                        style={styles.errorLabel}>
                        {i18n.t(input.errorKey)}
                    </Text>
                )}
            </>
        );
    };

    const renderDropdown = (inputKey: string, input: SubmitFormSelectInput) => {
        const defaultValue = input.value ?
            i18n.t(input.value)
            : `${i18n.t(input.labelKey)}...`;
        return (
            <>
                <Text
                    testID={input.labelTestID}
                    style={styles.labelTitle}>
                    {i18n.t(input.labelKey)}
                    {input.isRequired && '*'}
                </Text>
                <ModalDropdown
                    testID={input.inputTestID}
                    style={styles.modalDropdownContainerStyle}
                    disabled={props.isLoading}
                    dropdownStyle={styles.modalDropdownStyle}
                    textStyle={styles.modalDropdownTextStyle}
                    dropdownTextStyle={styles.dropdownTextStyle}
                    dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                    defaultValue={defaultValue}
                    options={input.options.map((option) => {
                        return i18n.t(option);
                    })}
                    onSelect={(index: string) => {
                        props.onInputValueChanged(
                            inputKey,
                            input.options[parseInt(index)]
                        );
                    }} />
                {!input.isValid && (
                    <Text
                        testID={input.errorTestID}
                        style={styles.errorLabel}>
                        {i18n.t(input.errorKey)}
                    </Text>
                )}
            </>
        );
    };

    const renderSwitch = (inputKey: string, input: SubmitFormInput) => {
        return (
            <>
                <Text
                    testID={input.labelTestID}
                    style={styles.labelTitle}>
                    {i18n.t(input.labelKey)}
                </Text>
                <Switch
                    testID={input.inputTestID}
                    style={styles.switchStyle}
                    disabled={props.isLoading}
                    trackColor={{ false: colors.grey, true: colors.primaryColor }}
                    thumbColor={colors.accentColor}
                    value={Boolean(input.value)}
                    onValueChange={(value) => props.onInputValueChanged(inputKey, value)} />
                {!input.isValid && (
                    <Text
                        testID={input.errorTestID}
                        style={styles.errorLabel}>
                        {i18n.t(input.errorKey)}
                    </Text>
                )}
            </>
        );
    };

    return (
        <>
            <Card
                testID='lost-dog-details-content-description-card'
                styles={
                props.inputs.get(SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY)?.isValid ?
                    styles.descriptionCardStyle
                    : styles.descriptionCardErrorStyle
            }>
                <>
                    <TextInput
                        testID='details-screen-description-text-input'
                        style={styles.descriptionTextInputStyle}
                        editable={!props.isLoading}
                        multiline
                        placeholder={`${i18n.t('general.description')}*...`}
                        value={props.inputs.get(SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY)?.value?.toString() || ''}
                        onChangeText={(value) => props.onInputValueChanged(SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY, value)} />
                    {!props.inputs.get(SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY)?.isValid && (
                        <Text
                            testID='details-screen-description-text-input-error'
                            style={styles.errorLabelWhite}>
                            {i18n.t('submitForm.validation.fieldEmpty')}
                        </Text>
                    )}
                </>
            </Card>
            <Card testID='lost-dog-details-content-inputs-card'>
                <>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            {renderInput(SUBMIT_FORM_NAME_TEXT_INPUT_KEY)}
                        </View>
                        <View style={styles.columnContainer}>
                            {renderInput(SUBMIT_FORM_BREED_TEXT_INPUT_KEY)}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            {renderInput(SUBMIT_FORM_SEX_SELECT_INPUT_KEY)}
                        </View>
                        <View style={styles.columnContainer}>
                            {renderInput(SUBMIT_FORM_COLOR_TEXT_INPUT_KEY)}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            {renderInput(SUBMIT_FORM_STATUS_SELECT_INPUT_KEY)}
                        </View>
                        <View style={styles.columnContainer}>
                            {renderInput(SUBMIT_FORM_AGE_TEXT_INPUT_KEY)}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            {renderInput(SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY)}
                        </View>
                        {props.inputs.get(SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY)?.value && (
                            <View style={styles.columnContainer}>
                                {renderInput(SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY)}
                            </View>
                        )}
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.asteriskExplanationStyle}>
                            {i18n.t('general.requiredField')}
                        </Text>
                    </View>
                </>
            </Card>
            <Card testID='lost-dog-details-content-contact-inputs-card'>
                <View style={styles.rowContainer}>
                    <View style={styles.columnContainer}>
                        {renderInput(SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY)}
                    </View>
                    <View style={styles.columnContainer}>
                        {renderInput(SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY)}
                    </View>
                </View>
            </Card>
        </>
    );
};

const styles = StyleSheet.create({
    descriptionCardStyle: {
        height: 'auto',
        backgroundColor: colors.accentColor
    },
    descriptionCardErrorStyle: {
        height: 'auto',
        backgroundColor: colors.errorRed
    },
    descriptionTextInputStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 14,
        fontStyle: 'italic',
        borderBottomWidth: 1
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        marginBottom: 8
    },
    columnContainer: {
        width: '50%'
    },
    labelTitle: {
        fontWeight: 'bold',
        color: colors.accentColor,
        fontSize: 16
    },
    errorLabel: {
        fontSize: 12,
        color: colors.errorRed
    },
    errorLabelWhite: {
        fontSize: 12,
        color: colors.white
    },
    textInputStyle: {
        color: colors.grey,
        fontSize: 14,
        borderBottomWidth: 1,
        borderColor: colors.grey,
        marginEnd: 16,
        height: 32
    },
    modalDropdownContainerStyle: {
        borderBottomWidth: 1,
        borderColor: colors.grey,
        marginEnd: 16,
        height: 32,
        justifyContent: 'center',
        flex: 1
    },
    modalDropdownStyle: {
        width: '40%',
        height: -1,
        borderWidth: 2,
        borderColor: colors.primaryColor
    },
    modalDropdownTextStyle: {
        color: colors.grey,
        fontSize: 14
    },
    dropdownTextStyle: {
        color: colors.grey,
        fontSize: 14,
        flex: 1
    },
    dropdownTextHighlightStyle: {
        color: colors.accentColor,
        fontWeight: 'bold'
    },
    switchStyle: {
        alignSelf: 'flex-start'
    },
    asteriskExplanationStyle: {
        color: colors.accentColor,
        fontSize: 12
    }
});

LostDogDetailsContent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    inputs: PropTypes.object.isRequired,
    onInputValueChanged: PropTypes.func.isRequired
};

export default LostDogDetailsContent;