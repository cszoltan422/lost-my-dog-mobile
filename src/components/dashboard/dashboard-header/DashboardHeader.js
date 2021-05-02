import React, { Fragment } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Slider, Tab } from 'react-native-elements';
import {
    DASHBOARD_MAX_SEARCH_DISTANCE_IN_METERS,
    DASHBOARD_MIN_SEARCH_DISTANCE_IN_METERS,
    DASHBOARD_SEARCH_TYPES,
    DASHBOARD_STEP_SEARCH_DISTANCE_IN_METERS
} from '../../../application.constants';
import i18n from '../../../i18n/i18n';
import {
    DASHBOARD_SEARCH_FOUND_TAB,
    DASHBOARD_SEARCH_LOST_WANDERING_TAB,
    DASHBOARD_SEARCH_PARAMETERS_DISTANCE
} from '../../../i18n/i18n.keys';
import colors from '../../../colors';

const DashboardHeader = (props) => {

    const onTabValueChange = (value) => {
        const currentValue = Object.keys(DASHBOARD_SEARCH_TYPES).find(key => DASHBOARD_SEARCH_TYPES[key] === props.searchParameters.searchType);
        if (currentValue != value && !props.isLoading()) {
            props.onDashboardChangeSearchTypeParam(DASHBOARD_SEARCH_TYPES[value]);
        }
    }

    const onDashboardChangeSliderValue = (value) => {
        if (!props.isLoading()) {
            props.onDashboardChangeRadiusSearchParam(value);
        }
    }

    return (
        <Fragment>
            <Tab
                indicatorStyle={styles.indicatorStyle}
                value={Object.keys(DASHBOARD_SEARCH_TYPES).find(key => DASHBOARD_SEARCH_TYPES[key] === props.searchParameters.searchType)}
                onChange={onTabValueChange}>
                <Tab.Item
                    title={i18n.t(DASHBOARD_SEARCH_LOST_WANDERING_TAB)}
                    type='clear'
                    color={colors.primaryColor}
                    titleStyle={styles.titleStyle}
                    buttonStyle={styles.buttonStyle}>
                    <View />
                </Tab.Item>
                <Tab.Item
                    title={i18n.t(DASHBOARD_SEARCH_FOUND_TAB)}
                    type='clear'
                    color={colors.primaryColor}
                    titleStyle={styles.titleStyle}
                    buttonStyle={styles.buttonStyle}>
                    <View />
                </Tab.Item>
            </Tab>
            <View style={styles.sliderStyle}>
                <Slider
                    value={props.searchParameters.radiusInMeters}
                    minimumValue={DASHBOARD_MIN_SEARCH_DISTANCE_IN_METERS}
                    maximumValue={DASHBOARD_MAX_SEARCH_DISTANCE_IN_METERS}
                    step={DASHBOARD_STEP_SEARCH_DISTANCE_IN_METERS}
                    disabled={props.loading || props.refreshing || props.fetchingNew}
                    trackStyle={styles.trackStyle}
                    thumbStyle={styles.thumbStyle}
                    onSlidingComplete={(value) => onDashboardChangeSliderValue(value)} />
                <Text style={styles.sliderValueStyle}>
                    {i18n.t(DASHBOARD_SEARCH_PARAMETERS_DISTANCE)}: {props.searchParameters.radiusInMeters / 1000} km
                </Text>
            </View>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        color: colors.accentColor,
        fontSize: 12,
        fontWeight: 'bold',
        borderColor: colors.primaryColor
    },
    buttonStyle: {
        backgroundColor: 'white',
        borderColor: colors.primaryColor
    },
    indicatorStyle: {
        borderColor: colors.primaryColor,
        borderWidth: 1
    },
    sliderStyle: {
        elevation: 5,
        borderRadius: 16,
        backgroundColor: 'white',
        marginTop: 8,
        marginBottom: 12,
        padding: 8
    },
    sliderValueStyle: {
        color: colors.accentColor,
        fontWeight: 'bold'
    },
    trackStyle: {
        height: 5,
        backgroundColor: colors.primaryColor,
        color: colors.primaryColor
    },
    thumbStyle: {
        height: 20,
        width: 20,
        backgroundColor: colors.primaryColor
    }
});

export default DashboardHeader;