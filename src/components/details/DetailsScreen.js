import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, ScrollView, StyleSheet, Linking} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Card from '../common/card/Card';

import {
    DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS,
    DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS,
    DETAILS_NAVIGATION_PARAM_NAME
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
    DETAILS_SEND_MESSAGE
} from '../../i18n/i18n.keys';
import {formatIsoTime} from '../../util/date/date.utils';

const DetailsScreen = (props) => {

    const dog = props.navigation.getParam(DETAILS_NAVIGATION_PARAM_NAME);

    const onCallOwnerButtonPressed = () => {
        Linking.openURL(`tel:${dog.contactPhone}`);
    };

    const onSendOwnerButtonPressed = () => {
        Linking.openURL(`mailto:${dog.contactPhone}`);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Card styles={styles.imageCardStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={{uri: `data:image/png;base64,${dog.rawImage}`}} />
                </Card>
                <Card styles={styles.descriptionCardStyle}>
                    <Text style={styles.descriptionTextStyle}>
                        {`"${dog.description}"`}
                    </Text>
                </Card>
                <Card>
                    <View>
                        <View style={styles.rowContainer}>
                            <View style={styles.columnContainer}>
                                <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_NAME_LABEL_TITLE)}</Text>
                                <Text style={styles.labelValue}>{dog.dogName}</Text>
                            </View>
                            <View style={styles.columnContainer}>
                                <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_BREED_LABEL_TITLE)}</Text>
                                <Text style={styles.labelValue}>{dog.dogBreed}</Text>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.columnContainer}>
                                <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_SEX_LABEL_TITLE)}</Text>
                                <Text style={styles.labelValue}>{i18n.t(DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS[dog.gender])}</Text>
                            </View>
                            <View style={styles.columnContainer}>
                                <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_COLOR_LABEL_TITLE)}</Text>
                                <Text style={styles.labelValue}>{dog.color}</Text>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.columnContainer}>
                                <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_STATUS_LABEL_TITLE)}</Text>
                                <Text style={styles.labelValue}>{i18n.t(DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS[dog.status])}</Text>
                            </View>
                            <View style={styles.columnContainer}>
                                <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_AGE_LABEL_TITLE)}</Text>
                                <Text style={styles.labelValue}>{dog.age} {i18n.t(DETAILS_DOG_AGE_YEARS)}</Text>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.columnContainer}>
                                <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_CITY_LABEL_TITLE)}</Text>
                                <Text style={styles.labelValue}>{dog.city}, {dog.countryCode}</Text>
                            </View>
                            <View style={styles.columnContainer}>
                                <Text style={styles.labelTitle}>{i18n.t(DETAILS_DOG_DATE_LOST_LABEL_TITLE)}</Text>
                                <Text style={styles.labelValue}>{formatIsoTime(dog.dateLost)}</Text>
                            </View>
                        </View>
                    </View>
                </Card>
                <View>
                    <Card>
                        <View style={styles.rowContainer}>
                            <View style={styles.columnContainer}>
                                <Button
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
                </View>
            </View>
        </ScrollView>
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

DetailsScreen['navigationOptions'] = (navigationData) => ({
    title: navigationData.navigation.getParam(DETAILS_NAVIGATION_PARAM_NAME).dogName,
    headerBackTitleVisible: false
});

DetailsScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default DetailsScreen;
