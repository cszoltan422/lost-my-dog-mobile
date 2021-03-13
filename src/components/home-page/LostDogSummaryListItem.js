import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../colors';

class LostDogSummaryListItem extends Component {

    render() {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>{this.props.dog.dogName}</Text>
                <View style={styles.container}>
                <View style={styles.innerContainer}>
                        <Icon
                            type='font-awesome'
                            name='paw'
                            color={colors.accentColor}/>
                        <Text style={styles.dogBreed}>{this.props.dog.dogBreed}</Text>
                    </View>
                    <View style={styles.innerContainer}>
                        <Icon
                            type='material'
                            name='room'
                            color={colors.accentColor}/>
                        <Text style={styles.locationLost}>Budapest, HU - TODO</Text>
                    </View>
                    <View style={styles.innerContainer}>
                        <Icon
                            type='material'
                            name='schedule'
                            color={colors.accentColor}/>
                        <Text style={styles.dateLost}>{this.props.dog.dateLost}</Text>
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
        height: 130
    },
    container: {
        flexDirection: 'column',
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        color: colors.accentColor,
        fontWeight: 'bold'
    },
    dogBreed: {
        marginStart: 8
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