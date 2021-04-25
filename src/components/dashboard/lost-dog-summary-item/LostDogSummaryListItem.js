import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import Chip from '../../common/chip/Chip';
import Card from '../../common/card/Card';
import colors from '../../../colors';
import i18n from '../../../i18n/i18n';
import { getTimeDifferenceString } from '../../../util/date/date.utils';
import {DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS} from '../../../application.constants';

class LostDogSummaryListItem extends Component {

    render() {
        return (
            <Card>
                <View style={styles.headerContainer}>
                    <View style={styles.imageTitleContainer}>
                        <View style={styles.imageContainer}>
                            <Avatar
                                size='medium'
                                rounded
                                title={this.props.dog.dogName.charAt(0)}
                                source={{
                                    uri: `https://lost-my-dog-staging.herokuapp.com/image/${this.props.dog.avatarFilename}`,
                                }} />
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.props.dog.dogName}</Text>
                            <View style={styles.rowContainer}>
                                <Icon
                                    type='font-awesome'
                                    name='paw'
                                    color={colors.accentColor}/>
                                <Text style={styles.dogBreed}>{this.props.dog.dogBreed}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statusChipContainer}>
                        <Chip text={i18n.t(DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS[this.props.dog.status])} />
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.rowContainer}>
                        <Icon
                            type='material'
                            name='room'
                            color={colors.accentColor}/>
                        <Text style={styles.locationLost}>{this.props.dog.city}, {this.props.dog.countryCode}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Icon
                            type='material'
                            name='schedule'
                            color={colors.accentColor}/>
                        <Text style={styles.dateLost}>{getTimeDifferenceString(this.props.dog.dateLost)}</Text>
                    </View>
                </View>
            </Card>
        );
    }
}

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

export default LostDogSummaryListItem;