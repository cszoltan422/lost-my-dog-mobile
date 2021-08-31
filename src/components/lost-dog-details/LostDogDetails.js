import React from 'react';
import PropTypes from 'prop-types';
import {Image, ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';
import Card from '../common/card/Card';
import ENV from '../../environmnent.config';
import i18n from '../../i18n/i18n';
import {
    DETAILS_CALL_OWNER,
    DETAILS_DOG_AGE_LABEL_TITLE,
    DETAILS_DOG_AGE_YEARS,
    DETAILS_DOG_BREED_LABEL_TITLE,
    DETAILS_DOG_CITY_LABEL_TITLE,
    DETAILS_DOG_COLOR_LABEL_TITLE,
    DETAILS_DOG_DATE_LOST_LABEL_TITLE, DETAILS_DOG_DESCRIPTION_LABEL_TITLE,
    DETAILS_DOG_NAME_LABEL_TITLE,
    DETAILS_DOG_SEX_LABEL_TITLE,
    DETAILS_DOG_STATUS_LABEL_TITLE, DETAILS_MAP_VIEW_MARKER_TITLE, DETAILS_SEND_MESSAGE
} from '../../i18n/i18n.keys';
import {
    DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS,
    DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS
} from '../../application.constants';
import {formatIsoTime} from '../../util/date/date.utils';
import {Button, Icon} from 'react-native-elements';
import colors from '../../colors';
import MapsView from '../common/map-view/MapsView';

const LostDogDetails = (props) => {

    const conditionalRender = (positiveComponent, negativeComponent, conditionValue) => {
        return (
            <>
                {conditionValue ?
                    positiveComponent
                    : negativeComponent
                }
            </>
        );
    };
    
    let { dog } = props;
    if (!dog) {
        dog = {};
    }
    
    return (
        <ScrollView
            testID='details-screen-scroll-view' >
            <View
                testID='details-screen-container'
                style={styles.container}>
                <Card>
                    {conditionalRender(
                        <Image
                            testID='details-screen-image'
                            style={styles.imageStyle}
                            source={{uri: `${ENV.API_URL}/image/${dog.avatarFilename}`,}} />,
                        <TextInput />,
                        !!props.dog && props.isReadOnly
                    )}
                </Card>
                <Card styles={styles.descriptionCardStyle}>
                    {conditionalRender(
                        <Text
                            testID='details-screen-description-text'
                            style={styles.descriptionTextStyle}>
                            {`"${dog.description}"`}
                        </Text>,
                        <TextInput
                            testID='details-screen-description-text-input'
                            style={styles.descriptionTextInputStyle}
                            multiline={true}
                            placeholder={`${i18n.t(DETAILS_DOG_DESCRIPTION_LABEL_TITLE)}...`}/>,
                        !!props.dog && props.isReadOnly
                    )}
                </Card>
                <Card>
                    <View>
                        <View style={styles.rowContainer}>
                            <View style={styles.columnContainer}>
                                <Text
                                    testID='details-screen-dog-name-text-label'
                                    style={styles.labelTitle}>
                                    {i18n.t(DETAILS_DOG_NAME_LABEL_TITLE)}
                                </Text>
                                {conditionalRender(
                                    <Text
                                        testID='details-screen-dog-name-text'
                                        style={styles.labelValue}>
                                        {dog.dogName}
                                    </Text>,
                                    <TextInput
                                        testID='details-screen-dog-name-text-input'
                                        style={styles.textInputStyle}
                                        placeholder={`${i18n.t(DETAILS_DOG_NAME_LABEL_TITLE)}...`} />,
                                    !!props.dog && props.isReadOnly
                                )}
                            </View>
                            <View style={styles.columnContainer}>
                                <Text
                                    testID='details-screen-dog-breed-text-label'
                                    style={styles.labelTitle}>
                                    {i18n.t(DETAILS_DOG_BREED_LABEL_TITLE)}
                                </Text>
                                {conditionalRender(
                                    <Text
                                        testID='details-screen-dog-breed-text'
                                        style={styles.labelValue}>
                                        {dog.dogBreed}
                                    </Text>,
                                    <TextInput
                                        testID='details-screen-dog-breed-text-input'
                                        style={styles.textInputStyle}
                                        placeholder={`${i18n.t(DETAILS_DOG_BREED_LABEL_TITLE)}...`} />,
                                    !!props.dog && props.isReadOnly
                                )}
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.columnContainer}>
                                <Text
                                    testID='details-screen-dog-gender-text-label'
                                    style={styles.labelTitle}>
                                    {i18n.t(DETAILS_DOG_SEX_LABEL_TITLE)}
                                </Text>
                                {conditionalRender(
                                    <Text
                                        testID='details-screen-dog-gender-text'
                                        style={styles.labelValue}>
                                        {i18n.t(DETAILS_DOG_SEX_ENUM_TRANSLATION_KEYS[dog.gender])}
                                    </Text>,
                                    <TextInput
                                        testID='details-screen-dog-gender-text-input'
                                        style={styles.textInputStyle}
                                        placeholder={`${i18n.t(DETAILS_DOG_SEX_LABEL_TITLE)}...`} />,
                                    !!props.dog && props.isReadOnly
                                )}
                            </View>
                            <View style={styles.columnContainer}>
                                <Text
                                    testID='details-screen-dog-color-text-label'
                                    style={styles.labelTitle}>
                                    {i18n.t(DETAILS_DOG_COLOR_LABEL_TITLE)}
                                </Text>
                                {conditionalRender(
                                    <Text
                                        testID='details-screen-dog-color-text'
                                        style={styles.labelValue}>
                                        {dog.color}
                                    </Text>,
                                    <TextInput
                                        testID='details-screen-dog-color-text-input'
                                        style={styles.textInputStyle}
                                        placeholder={`${i18n.t(DETAILS_DOG_COLOR_LABEL_TITLE)}...`} />,
                                    !!props.dog && props.isReadOnly
                                )}
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.columnContainer}>
                                <Text
                                    testID='details-screen-dog-status-text-label'
                                    style={styles.labelTitle}>
                                    {i18n.t(DETAILS_DOG_STATUS_LABEL_TITLE)}
                                </Text>
                                {conditionalRender(
                                    <Text
                                        testID='details-screen-dog-status-text'
                                        style={styles.labelValue}>
                                        {i18n.t(DASHBOARD_DOG_STATUS_ENUM_TRANSLATION_KEYS[dog.status])}
                                    </Text>,
                                    <TextInput
                                        testID='details-screen-dog-status-text-input'
                                        style={styles.textInputStyle}
                                        placeholder={`${i18n.t(DETAILS_DOG_STATUS_LABEL_TITLE)}...`} />,
                                    !!props.dog && props.isReadOnly
                                )}
                            </View>
                            <View style={styles.columnContainer}>
                                <Text
                                    testID='details-screen-dog-age-text-label'
                                    style={styles.labelTitle}>
                                    {i18n.t(DETAILS_DOG_AGE_LABEL_TITLE)}
                                </Text>
                                {conditionalRender(
                                    <Text
                                        testID='details-screen-dog-age-text'
                                        style={styles.labelValue}>
                                        {dog.age} {i18n.t(DETAILS_DOG_AGE_YEARS)}
                                    </Text>,
                                    <TextInput
                                        testID='details-screen-dog-age-text'
                                        style={styles.textInputStyle}
                                        placeholder={`${i18n.t(DETAILS_DOG_AGE_LABEL_TITLE)}...`} />,
                                    !!props.dog && props.isReadOnly
                                )}
                            </View>
                        </View>
                        {conditionalRender(
                            <View style={styles.rowContainer}>
                                <View style={styles.columnContainer}>
                                    <Text
                                        testID='details-screen-dog-location-text-label'
                                        style={styles.labelTitle}>
                                        {i18n.t(DETAILS_DOG_CITY_LABEL_TITLE)}
                                    </Text>
                                    <Text
                                        testID='details-screen-dog-location-text'
                                        style={styles.labelValue}>
                                        {dog.city}, {dog.countryCode}
                                    </Text>
                                </View>
                                <View style={styles.columnContainer}>
                                    <Text
                                        testID='details-screen-dog-date-lost-text-label'
                                        style={styles.labelTitle}>
                                        {i18n.t(DETAILS_DOG_DATE_LOST_LABEL_TITLE)}
                                    </Text>
                                    <Text
                                        testID='details-screen-dog-date-lost-text'
                                        style={styles.labelValue}>
                                        {formatIsoTime(dog.dateLost)}
                                    </Text>
                                </View>
                            </View>,
                            null,
                            !!props.dog && props.isReadOnly
                        )}
                    </View>
                </Card>
                {conditionalRender(
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
                                    title={i18n.t(DETAILS_CALL_OWNER)}
                                    onPress={props.onCallOwnerButtonPressed} />
                            </View>
                        </View>
                    </Card>,
                    null,
                    !!props.dog && props.isReadOnly
                )}
                {conditionalRender(
                    <Card>
                        <MapsView
                            longitude={dog.longitude}
                            latitude={dog.latitude}
                            markerTitle={i18n.t(DETAILS_MAP_VIEW_MARKER_TITLE)}
                            iconType='font-awesome'
                            iconName='paw'
                            iconSize={24}
                            iconColor={colors.accentColor} />
                    </Card>,
                    null,
                    !!props.dog && props.isReadOnly
                )}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    },
    imageStyle: {
        flex: 1,
        resizeMode: 'cover',
        height: 400
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
    descriptionTextInputStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 14,
        fontStyle: 'italic',
        borderBottomWidth: 1
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
    textInputStyle: {
        color: colors.grey,
        fontSize: 14,
        borderBottomWidth: 1,
        borderColor: colors.grey,
        marginEnd: 16
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

LostDogDetails.propTypes = {
    isReadOnly: PropTypes.bool.isRequired,
    dog: PropTypes.shape({
        id: PropTypes.number.isRequired,
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
        status: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
        avatarFilename: PropTypes.string.isRequired
    }),
    onSendOwnerButtonPressed: PropTypes.func,
    onCallOwnerButtonPressed: PropTypes.func
};

export default LostDogDetails;