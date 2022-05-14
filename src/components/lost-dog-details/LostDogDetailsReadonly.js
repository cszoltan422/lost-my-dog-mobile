import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import Card from '../common/card/card';
import MapsView from '../common/map-view/maps-view';
import LostDogDetailsHeaderReadonly from './header/LostDogDetailsHeaderReadonly';
import LostDogDetailsContentReadonly from './content/LostDogDetailsContentReadonly';
import i18n from '../../i18n/i18n';
import colors from '../../colors';

const LostDogDetailsReadonly = (props) => {

    return (
        <ScrollView
            testID='details-screen-scroll-view' >
            <View
                testID='details-screen-container'
                style={styles.container}>
                <LostDogDetailsHeaderReadonly dog={props.dog} />
                <LostDogDetailsContentReadonly dog={props.dog} />
                <Card>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            <Button
                                testID='details-screen-send-email-button'
                                style={styles.buttonStyle}
                                icon={
                                    <Icon
                                        style={styles.iconStyle}
                                        name='email'
                                        type='material'
                                        size={16}
                                        color={colors.white} />
                                }
                                buttonStyle={styles.buttonStyle}
                                titleStyle={{color: colors.white}}
                                title={i18n.t('general.sendMessage')}
                                disabled={props.dog.contactEmail === ''}
                                onPress={props.onSendOwnerButtonPressed} />
                        </View>
                        <View style={styles.columnContainer}>
                            <Button
                                testID='details-screen-call-owner-button'
                                icon={
                                    <Icon
                                        style={styles.iconStyle}
                                        name='phone'
                                        type='material'
                                        size={16}
                                        color={colors.white} />
                                }
                                buttonStyle={styles.buttonStyle}
                                titleStyle={{color: colors.white}}
                                title={i18n.t('general.callOwner')}
                                disabled={props.dog.contactPhone === ''}
                                onPress={props.onCallOwnerButtonPressed} />
                        </View>
                    </View>
                </Card>
                <Card>
                    <MapsView
                        longitude={props.dog.longitude}
                        latitude={props.dog.latitude}
                        markerTitle={i18n.t('general.lastSeenLocation')}
                        iconType='font-awesome'
                        iconName='paw'
                        iconSize={24}
                        iconColor={colors.accentColor} />
                </Card>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
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
    buttonStyle: {
        marginStart: 8,
        marginEnd: 8,
        backgroundColor: colors.accentColor
    },
    iconStyle: {
        marginEnd: 8
    }
});

LostDogDetailsReadonly.propTypes = {
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
    onSendOwnerButtonPressed: PropTypes.func,
    onCallOwnerButtonPressed: PropTypes.func
};

export default LostDogDetailsReadonly;