import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import Card from '../../common/card/Card';
import i18n from '../../../i18n/i18n';
import {
    DETAILS_DOG_AGE_LABEL_TITLE,
    DETAILS_DOG_AGE_YEARS,
    DETAILS_DOG_BREED_LABEL_TITLE, DETAILS_DOG_CHIP_NUMBER,
    DETAILS_DOG_CITY_LABEL_TITLE,
    DETAILS_DOG_COLOR_LABEL_TITLE,
    DETAILS_DOG_DATE_LOST_LABEL_TITLE, DETAILS_DOG_HAS_CHIP,
    DETAILS_DOG_NAME_LABEL_TITLE,
    DETAILS_DOG_SEX_LABEL_TITLE,
    DETAILS_DOG_STATUS_LABEL_TITLE
} from '../../../i18n/i18n.keys';
import {
    DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS, DETAILS_DOG_HAS_CHIP_ENUM_TRANSLATION_KEYS,
    DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS
} from '../../../application.constants';
import {formatIsoTime} from '../../../util/date/date.utils';
import colors from '../../../colors';

const LostDogDetailsContentReadonly = (props) => {

    return (
        <Card>
            <View>
                <View style={styles.rowContainer}>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-name-text-label'
                            style={styles.labelTitle}>
                            {i18n.t(DETAILS_DOG_NAME_LABEL_TITLE)}
                        </Text>
                        <Text
                            testID='details-screen-dog-name-text'
                            style={styles.labelValue}>
                            {props.dog.dogName}
                        </Text>
                    </View>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-breed-text-label'
                            style={styles.labelTitle}>
                            {i18n.t(DETAILS_DOG_BREED_LABEL_TITLE)}
                        </Text>
                        <Text
                            testID='details-screen-dog-breed-text'
                            style={styles.labelValue}>
                            {props.dog.dogBreed}
                        </Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-gender-text-label'
                            style={styles.labelTitle}>
                            {i18n.t(DETAILS_DOG_SEX_LABEL_TITLE)}
                        </Text>
                        <Text
                            testID='details-screen-dog-gender-text'
                            style={styles.labelValue}>
                            {i18n.t(DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS[props.dog.gender])}
                        </Text>
                    </View>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-color-text-label'
                            style={styles.labelTitle}>
                            {i18n.t(DETAILS_DOG_COLOR_LABEL_TITLE)}
                        </Text>
                        <Text
                            testID='details-screen-dog-color-text'
                            style={styles.labelValue}>
                            {props.dog.color}
                        </Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-status-text-label'
                            style={styles.labelTitle}>
                            {i18n.t(DETAILS_DOG_STATUS_LABEL_TITLE)}
                        </Text>
                        <Text
                            testID='details-screen-dog-status-text'
                            style={styles.labelValue}>
                            {i18n.t(DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS[props.dog.status])}
                        </Text>
                    </View>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-age-text-label'
                            style={styles.labelTitle}>
                            {i18n.t(DETAILS_DOG_AGE_LABEL_TITLE)}
                        </Text>
                        <Text
                            testID='details-screen-dog-age-text'
                            style={styles.labelValue}>
                            {props.dog.age} {i18n.t(DETAILS_DOG_AGE_YEARS)}
                        </Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-has-chip-text-label'
                            style={styles.labelTitle}>
                            {i18n.t(DETAILS_DOG_HAS_CHIP)}
                        </Text>
                        <Text
                            testID='details-screen-dog-has-chip-text'
                            style={styles.labelValue}>
                            {i18n.t(DETAILS_DOG_HAS_CHIP_ENUM_TRANSLATION_KEYS[props.dog.chippedStatus])}
                        </Text>
                    </View>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-chip-number-text-label'
                            style={styles.labelTitle}>
                            {i18n.t(DETAILS_DOG_CHIP_NUMBER)}
                        </Text>
                        <Text
                            testID='details-screen-dog-chip-number-text'
                            style={styles.labelValue}>
                            {props.dog.chipNumber}
                        </Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-location-text-label'
                            style={styles.labelTitle}>
                            {i18n.t(DETAILS_DOG_CITY_LABEL_TITLE)}
                        </Text>
                        <Text
                            testID='details-screen-dog-location-text'
                            style={styles.labelValue}>
                            {props.dog.city}, {props.dog.countryCode}
                        </Text>
                    </View>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-date-lost-text-label'
                            style={styles.labelTitle}>
                            {i18n.t(DETAILS_DOG_DATE_LOST_LABEL_TITLE)}
                        </Text>
                        <Text
                            testID='details-screen-dog-date-lost-text'
                            style={styles.labelValue}>
                            {formatIsoTime(props.dog.dateLost)}
                        </Text>
                    </View>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
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
    labelValue: {
        color: colors.grey,
        fontSize: 16
    }
});

LostDogDetailsContentReadonly.propTypes = {
    dog: PropTypes.shape({
        id: PropTypes.number.isRequired,
        submittedByUserId: PropTypes.number.isRequired,
        dogName: PropTypes.string.isRequired,
        dogBreed: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
        dateLost: PropTypes.string.isRequired,
        contactPhone: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
        avatarFilename: PropTypes.string.isRequired,
        chippedStatus: PropTypes.string.isRequired,
        chipNumber: PropTypes.string.isRequired,
        specialPeculiarities: PropTypes.string.isRequired
    }).isRequired,
};

export default LostDogDetailsContentReadonly;