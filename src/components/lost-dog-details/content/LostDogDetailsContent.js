import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput, View, Switch} from 'react-native';
import Card from '../../common/card/Card';
import ModalDropdown from 'react-native-modal-dropdown';
import i18n from '../../../i18n/i18n';
import {
    DETAILS_ASTERISK_EXPLANATION,
    DETAILS_DOG_DESCRIPTION_LABEL_TITLE,
    DETAILS_INPUT_REQUIRED
} from '../../../i18n/i18n.keys';
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

const LostDogDetailsContent = (props) => {

    const renderTextInput = (inputKey) => {
        return (
            <>
                <Text
                    testID={props.inputs[inputKey].labelTestID}
                    style={styles.labelTitle}>
                    {i18n.t(props.inputs[inputKey].labelKey)}
                    {props.inputs[inputKey].isRequired && '*'}
                </Text>
                <TextInput
                    testID={props.inputs[inputKey].inputTestID}
                    style={styles.textInputStyle}
                    editable={!props.isLoading}
                    placeholder={`${i18n.t(props.inputs[inputKey].labelKey)}...`}
                    keyboardType={props.inputs[inputKey].keyboardType}
                    autoCapitalize={props.inputs[inputKey].autoCapitalize}
                    contextMenuHidden={props.inputs[inputKey].contextMenuHidden}
                    value={props.inputs[inputKey].value}
                    onChangeText={(value) => props.onInputValueChanged(inputKey, value)} />
                {!props.inputs[inputKey].isValid && (
                    <Text
                        testID={props.inputs[inputKey].errorTestID}
                        style={styles.errorLabel}>
                        {i18n.t(props.inputs[inputKey].errorKey)}
                    </Text>
                )}
            </>
        );
    };

    const renderDropdown = (inputKey) => {
        return (
            <>
                <Text
                    testID={props.inputs[inputKey].labelTestID}
                    style={styles.labelTitle}>
                    {i18n.t(props.inputs[inputKey].labelKey)}
                    {props.inputs[inputKey].isRequired && '*'}
                </Text>
                <ModalDropdown
                    testID={props.inputs[inputKey].inputTestID}
                    style={styles.modalDropdownContainerStyle}
                    disabled={props.isLoading}
                    dropdownStyle={styles.modalDropdownStyle}
                    textStyle={styles.modalDropdownTextStyle}
                    dropdownTextStyle={styles.dropdownTextStyle}
                    dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                    defaultValue={`${i18n.t(props.inputs[inputKey].labelKey)}...`}
                    options={props.inputs[inputKey].options.map((option) => {
                        return i18n.t(option);
                    })}
                    onSelect={(index) => {
                        props.onInputValueChanged(
                            inputKey,
                            props.inputs[inputKey].options[index]
                        );
                    }} />
                {!props.inputs[inputKey].isValid && (
                    <Text
                        testID={props.inputs[inputKey].errorTestID}
                        style={styles.errorLabel}>
                        {i18n.t(DETAILS_INPUT_REQUIRED)}
                    </Text>
                )}
            </>
        );
    };

    const renderSwitch = (inputKey) => {
        return (
            <>
                <Text
                    testID={props.inputs[inputKey].labelTestID}
                    style={styles.labelTitle}>
                    {i18n.t(props.inputs[inputKey].labelKey)}
                    {props.inputs[inputKey].isRequired && '*'}
                </Text>
                <Switch
                    testID={props.inputs[inputKey].inputTestID}
                    style={styles.switchStyle}
                    disabled={props.isLoading}
                    trackColor={{ false: colors.grey, true: colors.primaryColor }}
                    thumbColor={colors.accentColor}
                    value={props.inputs[inputKey].value}
                    onValueChange={(value) => props.onInputValueChanged(inputKey, value)} />
                {!props.inputs[inputKey].isValid && (
                    <Text
                        testID={props.inputs[inputKey].errorTestID}
                        style={styles.errorLabel}>
                        {i18n.t(DETAILS_INPUT_REQUIRED)}
                    </Text>
                )}
            </>
        );
    };

    return (
        <>
            <Card styles={
                props.inputs[SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY].isValid ?
                    styles.descriptionCardStyle
                    : styles.descriptionCardErrorStyle
            }>
                <>
                    <TextInput
                        testID='details-screen-description-text-input'
                        style={styles.descriptionTextInputStyle}
                        editable={!props.isLoading}
                        multiline
                        placeholder={`${i18n.t(DETAILS_DOG_DESCRIPTION_LABEL_TITLE)}*...`}
                        value={props.inputs[SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY].value}
                        onChangeText={(value) => props.onInputValueChanged(SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY, value)} />
                    {!props.inputs[SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY].isValid && (
                        <Text
                            testID='details-screen-description-text-input-error'
                            style={styles.errorLabelWhite}>
                            {i18n.t(DETAILS_INPUT_REQUIRED)}
                        </Text>
                    )}
                </>
            </Card>
            <Card>
                <>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            {renderTextInput(SUBMIT_FORM_NAME_TEXT_INPUT_KEY)}
                        </View>
                        <View style={styles.columnContainer}>
                            {renderTextInput(SUBMIT_FORM_BREED_TEXT_INPUT_KEY)}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            {renderDropdown(SUBMIT_FORM_SEX_SELECT_INPUT_KEY)}
                        </View>
                        <View style={styles.columnContainer}>
                            {renderTextInput(SUBMIT_FORM_COLOR_TEXT_INPUT_KEY)}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            {renderDropdown(SUBMIT_FORM_STATUS_SELECT_INPUT_KEY)}
                        </View>
                        <View style={styles.columnContainer}>
                            {renderTextInput(SUBMIT_FORM_AGE_TEXT_INPUT_KEY)}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            {renderSwitch(SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY)}
                        </View>
                        {props.inputs[SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY].value && (
                            <View style={styles.columnContainer}>
                                {renderTextInput(SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY)}
                            </View>
                        )}
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.asteriskExplanationStyle}>
                            {i18n.t(DETAILS_ASTERISK_EXPLANATION)}
                        </Text>
                    </View>
                </>
            </Card>
            <Card>
                <View style={styles.rowContainer}>
                    <View style={styles.columnContainer}>
                        {renderTextInput(SUBMIT_FORM_SUBMITTER_EMAIL_INPUT_KEY)}
                    </View>
                    <View style={styles.columnContainer}>
                        {renderTextInput(SUBMIT_FORM_SUBMITTER_PHONE_NUMBER_INPUT_KEY)}
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