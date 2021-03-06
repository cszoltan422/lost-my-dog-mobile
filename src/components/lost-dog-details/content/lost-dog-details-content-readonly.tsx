import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from '../../common/card/card';
import i18n from '../../../i18n/i18n';
import {
    DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS, DETAILS_DOG_HAS_CHIP_ENUM_TRANSLATION_KEYS,
    DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS
} from '../../../application.constants';
import {formatIsoTime} from '../../../util/date/date.utils';
import colors from '../../../colors';
import {LostDog} from '../../../service/search-lost-dogs-service';

interface IProps {
    dog: LostDog;
}

const LostDogDetailsContentReadonly = (props: IProps) => {

    return (
        <Card>
            <View>
                <View style={styles.rowContainer}>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-name-text-label'
                            style={styles.labelTitle}>
                            {i18n.t('general.name')}
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
                            {i18n.t('general.breed')}
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
                            {i18n.t('general.sex')}
                        </Text>
                        <Text
                            testID='details-screen-dog-gender-text'
                            style={styles.labelValue}>
                            {i18n.t(DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS.get(props.dog.gender) || '')}
                        </Text>
                    </View>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-color-text-label'
                            style={styles.labelTitle}>
                            {i18n.t('general.color')}
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
                            {i18n.t('general.status')}
                        </Text>
                        <Text
                            testID='details-screen-dog-status-text'
                            style={styles.labelValue}>
                            {i18n.t(DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS.get(props.dog.status) || '')}
                        </Text>
                    </View>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-age-text-label'
                            style={styles.labelTitle}>
                            {i18n.t('general.age')}
                        </Text>
                        <Text
                            testID='details-screen-dog-age-text'
                            style={styles.labelValue}>
                            {props.dog.age} {i18n.t('general.years')}
                        </Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.columnContainer}>
                        <Text
                            testID='details-screen-dog-has-chip-text-label'
                            style={styles.labelTitle}>
                            {i18n.t('general.hasChip')}
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
                            {i18n.t('general.chipNumber')}
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
                            {i18n.t('general.city')}
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
                            {i18n.t('general.dateLost')}
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

export default LostDogDetailsContentReadonly;