import React from 'react';
import PropTypes from 'prop-types';
import ENV from '../../../../environmnent.config';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import Chip from '../../../common/chip/chip';
import Card from '../../../common/card/card';
import colors from '../../../../colors';
import i18n from '../../../../i18n/i18n';
import { DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS } from '../../../../application.constants';
import { getTimeDifferenceString } from '../../../../util/date/date.utils';

const DashboardListItem = (props) => {

    return (
        <TouchableOpacity
            testID={`dashboard-list-item-container-${props.index}`}
            onPress={() => props.onListItemClicked(props.dog)}>
            <Card>
                <>
                    <View
                        testID={`dashboard-list-item-header-container-${props.index}`}
                        style={styles.headerContainer}>
                        <View style={styles.imageTitleContainer}>
                            <View style={styles.imageContainer}>
                                <Avatar
                                    testID={`dashboard-list-item-header-image-${props.index}`}
                                    size='medium'
                                    rounded
                                    title={props.dog.dogName.charAt(0)}
                                    source={{
                                        uri: `${ENV.API_URL}/api/image/${props.dog.avatarFilename}`,
                                    }} />
                            </View>
                            <View style={styles.titleContainer}>
                                <Text
                                    testID={`dashboard-list-item-header-dog-name-${props.index}`}
                                    style={styles.title}>{props.dog.dogName}</Text>
                                <View style={styles.rowContainer}>
                                    <Icon
                                        type='font-awesome'
                                        name='paw'
                                        color={colors.accentColor} />
                                    <Text
                                        testID={`dashboard-list-item-header-dog-breed-${props.index}`}
                                        style={styles.dogBreed}>{props.dog.dogBreed}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.statusChipContainer}>
                            <Chip
                                testID={`dashboard-list-item-header-dog-status-${props.index}`}
                                text={i18n.t(DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS[props.dog.status])} />
                        </View>
                    </View>
                    <View
                        testID={`dashboard-list-item-details-container-${props.index}`}
                        style={styles.detailsContainer}>
                        <View style={styles.rowContainer}>
                            <Icon
                                type='material'
                                name='room'
                                color={colors.accentColor} />
                            <Text
                                testID={`dashboard-list-item-details-city-${props.index}`}
                                style={styles.locationLost}>{props.dog.city}, {props.dog.countryCode}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Icon
                                type='material'
                                name='schedule'
                                color={colors.accentColor} />
                            <Text
                                testID={`dashboard-list-item-details-date-lost-${props.index}`}
                                style={styles.dateLost}>{getTimeDifferenceString(props.dog.dateLost)}</Text>
                        </View>
                    </View>
                </>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageTitleContainer: {
        flexDirection: 'row',
    },
    imageContainer: {
        flexDirection: 'column',
        marginRight: 16
    },
    titleContainer: {
        flexDirection: 'column',
    },
    statusChipContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 24,
        color: colors.accentColor,
        fontWeight: 'bold'
    },
    dogBreed: {
        marginStart: 8,
        color: colors.grey
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    locationLost: {
        marginStart: 8
    },
    dateLost: {
        color: colors.grey,
        marginStart: 8
    }
});

DashboardListItem.propTypes = {
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
        contactEmail: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
        avatarFilename: PropTypes.string.isRequired,
        chippedStatus: PropTypes.string.isRequired,
        chipNumber: PropTypes.string.isRequired,
        specialPeculiarities: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    onListItemClicked: PropTypes.func.isRequired
};

export default DashboardListItem;