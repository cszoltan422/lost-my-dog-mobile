import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput, View, Switch} from 'react-native';
import Card from '../../common/card/Card';
import ModalDropdown from 'react-native-modal-dropdown';
import i18n from '../../../i18n/i18n';
import {
    DETAILS_DOG_AGE_LABEL_TITLE,
    DETAILS_DOG_BREED_LABEL_TITLE,
    DETAILS_DOG_CHIP_NUMBER,
    DETAILS_DOG_COLOR_LABEL_TITLE, DETAILS_DOG_DESCRIPTION_LABEL_TITLE,
    DETAILS_DOG_HAS_CHIP,
    DETAILS_DOG_NAME_LABEL_TITLE,
    DETAILS_DOG_SEX_LABEL_TITLE,
    DETAILS_DOG_STATUS_LABEL_TITLE, DETAILS_INPUT_REQUIRED
} from '../../../i18n/i18n.keys';
import colors from '../../../colors';
import {
    SUBMIT_FORM_AGE_TEXT_INPUT_KEY,
    SUBMIT_FORM_BREED_TEXT_INPUT_KEY,
    SUBMIT_FORM_COLOR_TEXT_INPUT_KEY, SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY,
    SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY,
    SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY,
    SUBMIT_FORM_NAME_TEXT_INPUT_KEY,
    SUBMIT_FORM_SEX_SELECT_INPUT_KEY,
    SUBMIT_FORM_STATUS_SELECT_INPUT_KEY
} from '../../../application.constants';

const LostDogDetailsContent = (props) => {

    return (
        <>
            <Card styles={styles.descriptionCardStyle}>
                <TextInput
                    testID='details-screen-description-text-input'
                    style={styles.descriptionTextInputStyle}
                    editable={!props.isLoading}
                    multiline
                    placeholder={`${i18n.t(DETAILS_DOG_DESCRIPTION_LABEL_TITLE)}...`}
                    value={props.inputs[SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY].value}
                    onChangeText={(value) => props.onInputValueChanged(SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY, value)} />
                {!props.inputs[SUBMIT_FORM_DESCRIPTION_TEXT_INPUT_KEY].isValid && (
                    <Text
                        testID='details-screen-description-text-input-error'
                        style={styles.errorLabel}>
                        {i18n.t(DETAILS_INPUT_REQUIRED)}
                    </Text>
                )}
            </Card>
            <Card>
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            <Text
                                testID='details-screen-dog-name-text-label'
                                style={styles.labelTitle}>
                                {i18n.t(DETAILS_DOG_NAME_LABEL_TITLE)}
                            </Text>
                            <TextInput
                                testID='details-screen-dog-name-text-input'
                                style={styles.textInputStyle}
                                editable={!props.isLoading}
                                placeholder={`${i18n.t(DETAILS_DOG_NAME_LABEL_TITLE)}...`}
                                value={props.inputs[SUBMIT_FORM_NAME_TEXT_INPUT_KEY].value}
                                onChangeText={(value) => props.onInputValueChanged(SUBMIT_FORM_NAME_TEXT_INPUT_KEY, value)} />
                            {!props.inputs[SUBMIT_FORM_NAME_TEXT_INPUT_KEY].isValid && (
                                <Text
                                    testID='details-screen-dog-name-text-input-error'
                                    style={styles.errorLabel}>
                                    {i18n.t(DETAILS_INPUT_REQUIRED)}
                                </Text>
                            )}
                        </View>
                        <View style={styles.columnContainer}>
                            <Text
                                testID='details-screen-dog-breed-text-label'
                                style={styles.labelTitle}>
                                {i18n.t(DETAILS_DOG_BREED_LABEL_TITLE)}
                            </Text>
                            <TextInput
                                testID='details-screen-dog-breed-text-input'
                                style={styles.textInputStyle}
                                editable={!props.isLoading}
                                placeholder={`${i18n.t(DETAILS_DOG_BREED_LABEL_TITLE)}...`}
                                value={props.inputs[SUBMIT_FORM_BREED_TEXT_INPUT_KEY].value}
                                onChangeText={(value) => props.onInputValueChanged(SUBMIT_FORM_BREED_TEXT_INPUT_KEY, value)} />
                            {!props.inputs[SUBMIT_FORM_BREED_TEXT_INPUT_KEY].isValid && (
                                <Text
                                    testID='details-screen-dog-breed-text-input-error'
                                    style={styles.errorLabel}>
                                    {i18n.t(DETAILS_INPUT_REQUIRED)}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            <Text
                                testID='details-screen-dog-gender-text-label'
                                style={styles.labelTitle}>
                                {i18n.t(DETAILS_DOG_SEX_LABEL_TITLE)}
                            </Text>
                            <ModalDropdown
                                testID='details-screen-dog-gender-select-input'
                                style={styles.modalDropdownContainerStyle}
                                disabled={props.isLoading}
                                dropdownStyle={styles.modalDropdownStyle}
                                textStyle={styles.modalDropdownTextStyle}
                                dropdownTextStyle={styles.dropdownTextStyle}
                                dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                                defaultValue={`${i18n.t(DETAILS_DOG_SEX_LABEL_TITLE)}...`}
                                options={props.inputs[SUBMIT_FORM_SEX_SELECT_INPUT_KEY].options.map((option) => {
                                    return i18n.t(option);
                                })}
                                onSelect={(index) => {
                                    props.onInputValueChanged(
                                        SUBMIT_FORM_SEX_SELECT_INPUT_KEY,
                                        props.inputs[SUBMIT_FORM_SEX_SELECT_INPUT_KEY].options[index]
                                    )
                                }} />
                            {!props.inputs[SUBMIT_FORM_SEX_SELECT_INPUT_KEY].isValid && (
                                <Text
                                    testID='details-screen-dog-gender-select-input-error'
                                    style={styles.errorLabel}>
                                    {i18n.t(DETAILS_INPUT_REQUIRED)}
                                </Text>
                            )}
                        </View>
                        <View style={styles.columnContainer}>
                            <Text
                                testID='details-screen-dog-color-text-label'
                                style={styles.labelTitle}>
                                {i18n.t(DETAILS_DOG_COLOR_LABEL_TITLE)}
                            </Text>
                            <TextInput
                                testID='details-screen-dog-color-text-input'
                                style={styles.textInputStyle}
                                editable={!props.isLoading}
                                placeholder={`${i18n.t(DETAILS_DOG_COLOR_LABEL_TITLE)}...`}
                                value={props.inputs[SUBMIT_FORM_COLOR_TEXT_INPUT_KEY].value}
                                onChangeText={(value) => props.onInputValueChanged(SUBMIT_FORM_COLOR_TEXT_INPUT_KEY, value)} />
                            {!props.inputs[SUBMIT_FORM_COLOR_TEXT_INPUT_KEY].isValid && (
                                <Text
                                    testID='details-screen-dog-color-text-input-error'
                                    style={styles.errorLabel}>
                                    {i18n.t(DETAILS_INPUT_REQUIRED)}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            <Text
                                testID='details-screen-dog-status-text-label'
                                style={styles.labelTitle}>
                                {i18n.t(DETAILS_DOG_STATUS_LABEL_TITLE)}
                            </Text>
                            <ModalDropdown
                                testID='details-screen-dog-status-select-input'
                                style={styles.modalDropdownContainerStyle}
                                disabled={props.isLoading}
                                dropdownStyle={styles.modalDropdownStyle}
                                textStyle={styles.modalDropdownTextStyle}
                                dropdownTextStyle={styles.dropdownTextStyle}
                                dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                                defaultValue={`${i18n.t(DETAILS_DOG_STATUS_LABEL_TITLE)}...`}
                                options={props.inputs[SUBMIT_FORM_STATUS_SELECT_INPUT_KEY].options.map((option) => {
                                    return i18n.t(option);
                                })}
                                onSelect={(index) => {
                                    props.onInputValueChanged(
                                        SUBMIT_FORM_STATUS_SELECT_INPUT_KEY,
                                        props.inputs[SUBMIT_FORM_STATUS_SELECT_INPUT_KEY].options[index]
                                    )
                                }} />
                            {!props.inputs[SUBMIT_FORM_STATUS_SELECT_INPUT_KEY].isValid && (
                                <Text
                                    testID='details-screen-dog-status-select-input-error'
                                    style={styles.errorLabel}>
                                    {i18n.t(DETAILS_INPUT_REQUIRED)}
                                </Text>
                            )}
                        </View>
                        <View style={styles.columnContainer}>
                            <Text
                                testID='details-screen-dog-age-text-label'
                                style={styles.labelTitle}>
                                {i18n.t(DETAILS_DOG_AGE_LABEL_TITLE)}
                            </Text>
                            <TextInput
                                testID='details-screen-dog-age-text-input'
                                style={styles.textInputStyle}
                                editable={!props.isLoading}
                                placeholder={`${i18n.t(DETAILS_DOG_AGE_LABEL_TITLE)}...`}
                                keyboardType = 'numeric'
                                value={props.inputs[SUBMIT_FORM_AGE_TEXT_INPUT_KEY].value}
                                onChangeText={(value) => props.onInputValueChanged(SUBMIT_FORM_AGE_TEXT_INPUT_KEY, value)} />
                            {!props.inputs[SUBMIT_FORM_AGE_TEXT_INPUT_KEY].isValid && (
                                <Text
                                    testID='details-screen-dog-age-text-input-error'
                                    style={styles.errorLabel}>
                                    {i18n.t(DETAILS_INPUT_REQUIRED)}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            <Text
                                testID='details-screen-dog-has-chip-text-label'
                                style={styles.labelTitle}>
                                {i18n.t(DETAILS_DOG_HAS_CHIP)}
                            </Text>
                            <Switch
                                testID='details-screen-dog-has-chip-toggle-input'
                                style={styles.switchStyle}
                                disabled={props.isLoading}
                                trackColor={{ false: colors.grey, true: colors.primaryColor }}
                                thumbColor={colors.accentColor}
                                value={props.inputs[SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY].value}
                                onValueChange={(value) => props.onInputValueChanged(SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY, value)} />
                            {!props.inputs[SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY].isValid && (
                                <Text
                                    testID='details-screen-dog-has-chip-toggle-input-error'
                                    style={styles.errorLabel}>
                                    {i18n.t(DETAILS_INPUT_REQUIRED)}
                                </Text>
                            )}
                        </View>
                        {props.inputs[SUBMIT_FORM_HAS_CHIP_TOGGLE_INPUT_KEY].value && (
                            <View style={styles.columnContainer}>
                                <Text
                                    testID='details-screen-dog-chip-number-text-label'
                                    style={styles.labelTitle}>
                                    {i18n.t(DETAILS_DOG_CHIP_NUMBER)}
                                </Text>
                                <TextInput
                                    testID='details-screen-dog-chip-number-text-input'
                                    style={styles.textInputStyle}
                                    editable={!props.isLoading}
                                    placeholder={`${i18n.t(DETAILS_DOG_CHIP_NUMBER)}...`}
                                    value={props.inputs[SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY].value}
                                    onChangeText={(value) => props.onInputValueChanged(SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY, value)} />
                                {!props.inputs[SUBMIT_FORM_CHIP_NUMBER_TEXT_INPUT_KEY].isValid && (
                                    <Text
                                        testID='details-screen-dog-chip-number-text-input-error'
                                        style={styles.errorLabel}>
                                        {i18n.t(DETAILS_INPUT_REQUIRED)}
                                    </Text>
                                )}
                            </View>
                        )}
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
    descriptionTextStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        fontStyle: 'italic'
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
    }
});

LostDogDetailsContent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    inputs: PropTypes.object.isRequired,
    onInputValueChanged: PropTypes.func.isRequired
};

export default LostDogDetailsContent;