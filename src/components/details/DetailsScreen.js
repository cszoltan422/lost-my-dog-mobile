import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {View, Text, Image, ScrollView, StyleSheet, Linking} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Card from '../common/card/Card';
import HeaderMenu from '../menu/HeaderMenu';
import FloatingActionButton from '../common/floating-action-button/FloatingActionButton';
import MapsView from '../common/map-view/MapsView';
import {
    DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS,
    DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS,
    DETAILS_NAVIGATION_PARAM_NAME,
    LOGIN_NAVIGATION_SCREEN_NAME,
    SUBMIT_DOG_NAVIGATION_PARAM_NAME
} from '../../application.constants';
import colors from '../../colors';
import i18n from '../../i18n/i18n';
import {
    DETAILS_CALL_OWNER,
    DETAILS_DOG_AGE_LABEL_TITLE,
    DETAILS_DOG_AGE_YEARS,
    DETAILS_DOG_BREED_LABEL_TITLE,
    DETAILS_DOG_CITY_LABEL_TITLE,
    DETAILS_DOG_COLOR_LABEL_TITLE,
    DETAILS_DOG_DATE_LOST_LABEL_TITLE,
    DETAILS_DOG_NAME_LABEL_TITLE,
    DETAILS_DOG_SEX_LABEL_TITLE,
    DETAILS_DOG_STATUS_LABEL_TITLE,
    DETAILS_MAP_VIEW_MARKER_TITLE,
    DETAILS_SEND_MESSAGE, SUBMIT_DOG_TITLE
} from '../../i18n/i18n.keys';
import {formatIsoTime} from '../../util/date/date.utils';

const DetailsScreen = (props) => {

    const dog = props.navigation.getParam(DETAILS_NAVIGATION_PARAM_NAME);
    const user = useSelector(state => state.application.user);

    const onCallOwnerButtonPressed = () => {
        Linking.openURL(`tel:${dog.contactPhone}`);
    };

    const onSendOwnerButtonPressed = () => {
        Linking.openURL(`mailto:${dog.contactEmail}`);
    };

    return (
        <Fragment>
            <ScrollView>
                <View
                    testID='details-screen-container'
                    style={styles.container}>
                    <Card styles={styles.imageCardStyle}>
                        <Image
                            testID='details-screen-image'
                            style={styles.imageStyle}
                            source={{uri: `data:image/png;base64,${dog.rawImage}`}} />
                    </Card>
                    <Card styles={styles.descriptionCardStyle}>
                        <Text
                            testID='details-screen-description-text'
                            style={styles.descriptionTextStyle}>
                            {`"${dog.description}"`}
                        </Text>
                    </Card>
                    <Card>
                        <View>
                            <View style={styles.rowContainer}>
                                <View style={styles.columnContainer}>
                                    <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_NAME_LABEL_TITLE)}</Text>
                                    <Text
                                        testID='details-screen-dog-name-text'
                                        style={styles.labelValue}>{dog.dogName}</Text>
                                </View>
                                <View style={styles.columnContainer}>
                                    <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_BREED_LABEL_TITLE)}</Text>
                                    <Text
                                        testID='details-screen-dog-breed-text'
                                        style={styles.labelValue}>{dog.dogBreed}</Text>
                                </View>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={styles.columnContainer}>
                                    <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_SEX_LABEL_TITLE)}</Text>
                                    <Text
                                        testID='details-screen-dog-gender-text'
                                        style={styles.labelValue}>{i18n.t(DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS[dog.gender])}</Text>
                                </View>
                                <View style={styles.columnContainer}>
                                    <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_COLOR_LABEL_TITLE)}</Text>
                                    <Text
                                        testID='details-screen-dog-color-text'
                                        style={styles.labelValue}>{dog.color}</Text>
                                </View>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={styles.columnContainer}>
                                    <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_STATUS_LABEL_TITLE)}</Text>
                                    <Text
                                        testID='details-screen-dog-status-text'
                                        style={styles.labelValue}>{i18n.t(DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS[dog.status])}</Text>
                                </View>
                                <View style={styles.columnContainer}>
                                    <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_AGE_LABEL_TITLE)}</Text>
                                    <Text
                                        testID='details-screen-dog-age-text'
                                        style={styles.labelValue}>{dog.age} {i18n.t(DETAILS_DOG_AGE_YEARS)}</Text>
                                </View>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={styles.columnContainer}>
                                    <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_CITY_LABEL_TITLE)}</Text>
                                    <Text
                                        testID='details-screen-dog-location-text'
                                        style={styles.labelValue}>{dog.city}, {dog.countryCode}</Text>
                                </View>
                                <View style={styles.columnContainer}>
                                    <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_DATE_LOST_LABEL_TITLE)}</Text>
                                    <Text
                                        testID='details-screen-dog-date-lost-text'
                                        style={styles.labelValue}>{formatIsoTime(dog.dateLost)}</Text>
                                </View>
                            </View>
                        </View>
                    </Card>
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
                                    title={i18n.t(DETAILS_SEND_MESSAGE)}
                                    onPress={onSendOwnerButtonPressed} />
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
                                    title={i18n.t(DETAILS_CALL_OWNER)}
                                    onPress={onCallOwnerButtonPressed} />
                            </View>
                        </View>
                    </Card>
                    <Card>
                        <MapsView
                            longitude={dog.longitude}
                            latitude={dog.latitude}
                            markerTitle={i18n.t(DETAILS_MAP_VIEW_MARKER_TITLE)}
                            iconType='font-awesome'
                            iconName='paw'
                            iconSize={24}
                            iconColor={colors.accentColor}
                        />
                    </Card>
                </View>
            </ScrollView>
            <FloatingActionButton
                color={colors.primaryColor}
                icon={{ name: 'add', color: colors.white }}
                openIcon={{ name: 'close', color: colors.white }}
                actions={[
                    {
                        title: i18n.t(SUBMIT_DOG_TITLE),
                        icon: { name: 'add', color: colors.white },
                        color: colors.primaryColor,
                        pressHandler: () => {
                            props.navigation.navigate({
                                routeName: user.isLoggedIn ?
                                    SUBMIT_DOG_NAVIGATION_PARAM_NAME
                                    : LOGIN_NAVIGATION_SCREEN_NAME
                            });
                        }
                    }
                ]} />
        </Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    },
    imageCardStyle: {
        height: 400
    },
    imageStyle: {
        flex: 1,
        resizeMode: 'cover'
    },
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

DetailsScreen['navigationOptions'] = ({ navigation }) => ({
    title: navigation.getParam(DETAILS_NAVIGATION_PARAM_NAME).dogName,
    headerBackTitleVisible: false,
    headerRight: () => <HeaderMenu navigation={navigation} /> // eslint-disable-line
});

DetailsScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default DetailsScreen;
