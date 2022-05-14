import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Card from '../common/card/card';
import MapsView from '../common/map-view/maps-view';
import LostDogDetailsHeaderReadonly from './header/lost-dog-details-header-readonly';
import LostDogDetailsContentReadonly from './content/lost-dog-details-content-readonly';
import i18n from '../../i18n/i18n';
import colors from '../../colors';
import {LostDog} from '../../service/search-lost-dogs-service';
import {Button, Icon} from '@rneui/base';

interface IProps {
    dog: LostDog;
    onSendOwnerButtonPressed: () => void;
    onCallOwnerButtonPressed: () => void;
}

const LostDogDetailsReadonly = (props: IProps) => {

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

export default LostDogDetailsReadonly;