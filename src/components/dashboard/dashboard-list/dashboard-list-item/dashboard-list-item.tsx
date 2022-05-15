import React from 'react';
import ENV from '../../../../environmnent.config';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Chip from '../../../common/chip/chip';
import Card from '../../../common/card/card';
import colors from '../../../../colors';
import i18n from '../../../../i18n/i18n';
import { DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS } from '../../../../application.constants';
import { getTimeDifferenceString } from '../../../../util/date/date.utils';
import {LostDog} from '../../../../service/search-lost-dogs-service';
import {Icon} from '@rneui/base';
import {Avatar} from '@rneui/themed';

interface IProps {
    index: number;
    dog: LostDog;
    onListItemClicked: (dog: LostDog) => void;
}

const DashboardListItem = (props: IProps) => {

    return (
        <TouchableOpacity
            testID={`dashboard-list-item-container-${props.index}`}
            onPress={() => props.onListItemClicked(props.dog)}>
            <Card>
                <View
                    testID={`dashboard-list-item-header-container-${props.index}`}
                    style={styles.headerContainer}>
                    <View style={styles.imageTitleContainer}>
                        <View style={styles.imageContainer}>
                            <Avatar
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
                            text={i18n.t(DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS.get(props.dog.status) || '')} />
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

export default DashboardListItem;