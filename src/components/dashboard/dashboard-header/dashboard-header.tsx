import React from 'react';
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
import {Button, Slider} from '@rneui/base';
import {useAppDispatch, useAppSelector} from '../../../redux/store/store';
import {setDashboardSearchRadius, setDashboardSearchType} from '../../../redux/reducers/dashboard/dashboard-reducer';

const DashboardHeader = () => {
    const loading = useAppSelector(state => state.dashboard.loading);
    const refreshing = useAppSelector(state => state.dashboard.refreshing);
    const fetchingNew = useAppSelector(state => state.dashboard.fetchingNew);
    const searchParameters = useAppSelector(state => state.dashboard.searchParameters);

    const dispatch = useAppDispatch();

    const isLoading = loading || refreshing || fetchingNew;

    const onTabValueChange = (value: string) => {
        if (!isLoading) {
            dispatch(setDashboardSearchType(value));
        }
    };

    const onDashboardChangeSliderValue = (value: number) => {
        if (!isLoading) {
            dispatch(setDashboardSearchRadius(value));
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
                            DASHBOARD_SEARCH_TYPE_LOST === searchParameters.searchType ?
                                styles.activeButtonStyle : null
                        ]}
                        titleStyle={styles.titleStyle}
                        title={`${i18n.t('general.lost')} / ${i18n.t('general.wandering')}`}
                        disabled={isLoading}
                        onPress={() => onTabValueChange(DASHBOARD_SEARCH_TYPE_LOST)} />
                </View>
                <View style={styles.tabItemContainer}>
                    <Button
                        testID='dashboard-header-tabs-found-button'
                        buttonStyle={[
                            styles.tabButtonStyle,
                            DASHBOARD_SEARCH_TYPE_FOUND === searchParameters.searchType ?
                                styles.activeButtonStyle : null
                        ]}
                        titleStyle={styles.titleStyle}
                        title={i18n.t('general.found')}
                        disabled={isLoading}
                        onPress={() => onTabValueChange(DASHBOARD_SEARCH_TYPE_FOUND)} />
                </View>
            </View>
            <View
                testID='dashboard-header-slider-container'
                style={styles.sliderStyle}>
                <Slider
                    value={searchParameters.radiusInMeters}
                    minimumValue={DASHBOARD_MIN_SEARCH_DISTANCE_IN_METERS}
                    maximumValue={DASHBOARD_MAX_SEARCH_DISTANCE_IN_METERS}
                    step={DASHBOARD_STEP_SEARCH_DISTANCE_IN_METERS}
                    disabled={isLoading}
                    trackStyle={styles.trackStyle}
                    thumbStyle={styles.thumbStyle}
                    onSlidingComplete={(value) => onDashboardChangeSliderValue(value)} />
                <Text
                    testID='dashboard-header-slider-distance-text'
                    style={styles.sliderValueStyle}>
                    {i18n.t('general.distance')}: {searchParameters.radiusInMeters / 1000} km
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

export default DashboardHeader;