import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View} from 'react-native';
import {
    DASHBOARD_MAX_SEARCH_DISTANCE_IN_METERS,
    DASHBOARD_MIN_SEARCH_DISTANCE_IN_METERS,
    DASHBOARD_SEARCH_TYPE_FOUND,
    DASHBOARD_SEARCH_TYPE_LOST,
    DASHBOARD_STEP_SEARCH_DISTANCE_IN_METERS
} from '../../../application.constants';
import i18n from '../../../i18n/i18n';
import colors from '../../../colors';
import {LostDogSearchParameters} from '../../../service/search-lost-dogs-service';
import {Button, Slider} from '@rneui/base';

interface IProps {
    loading: boolean;
    refreshing: boolean;
    fetchingNew: boolean;
    isLoading: () => boolean;
    searchParameters: LostDogSearchParameters;
    onDashboardChangeRadiusSearchParam: (value: number) => void;
    onDashboardChangeSearchTypeParam: (value: string) => void;
}

const DashboardHeader = (props: IProps) => {

    const onTabValueChange = (value: string) => {
        if (!props.isLoading()) {
            props.onDashboardChangeSearchTypeParam(value);
        }
    };

    const onDashboardChangeSliderValue = (value: number) => {
        if (!props.isLoading()) {
            props.onDashboardChangeRadiusSearchParam(value);
        }
    };

    return (
        <>
            <View
                testID='dashboard-header-tabs-container'
                style={styles.tabsContainerStyle}>
                <View style={styles.tabItemContainer}>
                    <Button
                        testID='dashboard-header-tabs-lost-button'
                        buttonStyle={[
                            styles.tabButtonStyle,
                            DASHBOARD_SEARCH_TYPE_LOST === props.searchParameters.searchType ?
                                styles.activeButtonStyle : null
                        ]}
                        titleStyle={styles.titleStyle}
                        title={`${i18n.t('general.lost')} / ${i18n.t('general.wandering')}`}
                        disabled={props.isLoading()}
                        onPress={() => onTabValueChange(DASHBOARD_SEARCH_TYPE_LOST)} />
                </View>
                <View style={styles.tabItemContainer}>
                    <Button
                        testID='dashboard-header-tabs-found-button'
                        buttonStyle={[
                            styles.tabButtonStyle,
                            DASHBOARD_SEARCH_TYPE_FOUND === props.searchParameters.searchType ?
                                styles.activeButtonStyle : null
                        ]}
                        titleStyle={styles.titleStyle}
                        title={i18n.t('general.found')}
                        disabled={props.isLoading()}
                        onPress={() => onTabValueChange(DASHBOARD_SEARCH_TYPE_FOUND)} />
                </View>
            </View>
            <View
                testID='dashboard-header-slider-container'
                style={styles.sliderStyle}>
                <Slider
                    value={props.searchParameters.radiusInMeters}
                    minimumValue={DASHBOARD_MIN_SEARCH_DISTANCE_IN_METERS}
                    maximumValue={DASHBOARD_MAX_SEARCH_DISTANCE_IN_METERS}
                    step={DASHBOARD_STEP_SEARCH_DISTANCE_IN_METERS}
                    disabled={props.isLoading()}
                    trackStyle={styles.trackStyle}
                    thumbStyle={styles.thumbStyle}
                    onSlidingComplete={(value) => onDashboardChangeSliderValue(value)} />
                <Text
                    testID='dashboard-header-slider-distance-text'
                    style={styles.sliderValueStyle}>
                    {i18n.t('general.distance')}: {props.searchParameters.radiusInMeters / 1000} km
                </Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    tabsContainerStyle: {
        flexDirection: 'row',
        borderRadius: 16,
    },
    tabItemContainer: {
        flex: 1
    },
    titleStyle: {
        color: colors.accentColor,
        fontSize: 12,
        fontWeight: 'bold',
        borderColor: colors.primaryColor,
        textTransform: 'uppercase',
        margin: 8
    },
    tabButtonStyle: {
        backgroundColor: colors.white,
        borderColor: colors.primaryColor
    },
    activeButtonStyle: {
        borderBottomWidth: 2,
        borderColor: colors.primaryColor
    },
    sliderStyle: {
        borderRadius: 16,
        backgroundColor: colors.white,
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

DashboardHeader.propTypes = {
    loading: PropTypes.bool.isRequired,
    refreshing: PropTypes.bool.isRequired,
    fetchingNew: PropTypes.bool.isRequired,
    isLoading: PropTypes.func.isRequired,
    searchParameters: PropTypes.shape({
        radiusInMeters: PropTypes.number.isRequired,
        searchType: PropTypes.string.isRequired,
    }).isRequired,
    onDashboardChangeRadiusSearchParam: PropTypes.func.isRequired,
    onDashboardChangeSearchTypeParam: PropTypes.func.isRequired
};

export default DashboardHeader;