import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
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
    DETAILS_DOG_AGE_LABEL_TITLE,
    DETAILS_DOG_BREED_LABEL_TITLE,
    DETAILS_DOG_CITY_LABEL_TITLE,
    DETAILS_DOG_COLOR_LABEL_TITLE,
    DETAILS_DOG_DATE_LOST_LABEL_TITLE,
    DETAILS_DOG_NAME_LABEL_TITLE,
    DETAILS_DOG_SEX_LABEL_TITLE,
    DETAILS_DOG_STATUS_LABEL_TITLE
} from '../../i18n/i18n.keys';
import {formatIsoTime} from '../../util/date/date.utils';

const DetailsScreen = (props) => {

    const dog = props.navigation.getParam(DETAILS_NAVIGATION_PARAM_NAME);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Card styles={{height: 400}}>
                    <Image
                        style={styles.imageStyle}
                        source={{uri: `data:image/png;base64,${dog.rawImage}`}} />
                </Card>
                <Card styles={{height: 'auto', backgroundColor: colors.accentColor}}>
                    <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 16, fontStyle: 'italic'}}>
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
                                <Text style={styles.labelValue}>{dog.age}</Text>
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
                                            name="email"
                                            type='material'
                                            size={16}
                                            color={colors.white} />
                                    }
                                    buttonStyle={{backgroundColor: colors.accentColor}}
                                    titleStyle={{color: colors.white}}
                                    title="Send message" />
                            </View>
                            <View style={styles.columnContainer}>
                                <Button
                                    style={styles.buttonStyle}
                                    icon={
                                        <Icon
                                            style={styles.iconStyle}
                                            name="phone"
                                            type='material'
                                            size={16}
                                            color={colors.white} />
                                    }
                                    buttonStyle={{backgroundColor: colors.accentColor}}
                                    titleStyle={{color: colors.white}}
                                    title="Call owner" />
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
    imageStyle: {
        flex: 1,
        resizeMode: 'cover'
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
        marginEnd: 8
    },
    iconStyle: {
        marginEnd: 8
    }
});

DetailsScreen['navigationOptions'] = (navigationData) => ({
    title: navigationData.navigation.getParam(DETAILS_NAVIGATION_PARAM_NAME).dogName,
    headerBackTitleVisible: false
});

export default DetailsScreen;
