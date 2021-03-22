import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import colors from '../../colors';
import { getTimeDifferenceString } from "../../util/date/date.utils";

class LostDogSummaryListItem extends Component {

    render() {
        return (
            <View style={styles.card}>
                <View style={styles.headerContainer}>
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
                <View style={styles.detailsContainer}>
                    <View style={styles.rowContainer}>
                        <Icon
                            type='material'
                            name='room'
                            color={colors.accentColor}/>
                        <Text style={styles.locationLost}>Budapest, HU</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Icon
                            type='material'
                            name='schedule'
                            color={colors.accentColor}/>
                        <Text style={styles.dateLost}>{getTimeDifferenceString(this.props.dog.dateLost)}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 16,
        backgroundColor: 'white',
        marginBottom: 8,
        padding: 8,
        height: 110
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        flexDirection: 'column',
        marginRight: 16
    },
    titleContainer: {
        flexDirection: 'column',
        
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