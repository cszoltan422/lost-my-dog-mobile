import React, { Component, Fragment } from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import LostDogSummaryListItem from './lost-dog-summary-item/LostDogSummaryListItem';
import LostDogSummaryListItemPlaceholder from './lost-dog-summary-item/LostDogSummaryListItemPlaceholder';
import LostDogSummaryEndIndicator from './lost-dog-summary-item/LostDogSummaryEndIndicator';
import { Slider, Tab } from 'react-native-elements';
import {connect} from 'react-redux';
import {
    onDashboardChangeSearchParams,
    onDashboardFetchNewPage,
    onDashboardMounted,
    onDashboardRefreshPage
} from '../../redux/actions/dashboard/action-creators/action.creators';
import {
    DASHBOARD_SEARCH_FOUND_TAB,
    DASHBOARD_SEARCH_LOST_WANDERING_TAB,
    DASHBOARD_SEARCH_PARAMETERS_DISTANCE,
    DASHBOARD_TITLE
} from '../../i18n/i18n.keys';
import i18n from '../../i18n/i18n';
import colors from "../../colors";
import {
    DASHBOARD_MAX_SEARCH_DISTANCE_IN_METERS,
    DASHBOARD_MIN_SEARCH_DISTANCE_IN_METERS, DASHBOARD_SEARCH_TYPES, DASHBOARD_STEP_SEARCH_DISTANCE_IN_METERS
} from "../../application.constants";

class DashboardScreen extends Component {

    constructor(props) {
        super(props);

        this.onDashboardFetchNewPage = this.onDashboardFetchNewPage.bind(this);
        this.onDashboardChangeSliderValue = this.onDashboardChangeSliderValue.bind(this);
        this.onTabValueChange = this.onTabValueChange.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        this.props.onDashboardMounted();
    }

    static navigationOptions = () => {
        return {
            title: i18n.t(DASHBOARD_TITLE)
        };
    };

    onDashboardFetchNewPage() {
        if (!this.props.hasNoMoreData && !this.isLoading()) {
            this.props.onDashboardFetchNewPage();
        }
    }

    onDashboardChangeSliderValue(value) {
        if (!this.isLoading()) {
            this.props.onDashboardChangeSearchParams({
                radiusInMeters: value,
                searchType: this.props.searchParameters.searchType
            });
        }
    }

    isLoading() {
        return this.props.fetchingNew || this.props.loading || this.props.refreshing;
    }

    onTabValueChange(value) {
        const currentValue = Object.keys(DASHBOARD_SEARCH_TYPES).find(key => DASHBOARD_SEARCH_TYPES[key] === this.props.searchParameters.searchType);
        if (currentValue != value && !this.isLoading()) {
            this.props.onDashboardChangeSearchParams({
                radiusInMeters: this.props.searchParameters.radiusInMeters,
                searchType: DASHBOARD_SEARCH_TYPES[value]
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Tab
                    indicatorStyle={styles.indicatorStyle}
                    value={Object.keys(DASHBOARD_SEARCH_TYPES).find(key => DASHBOARD_SEARCH_TYPES[key] === this.props.searchParameters.searchType)}
                    onChange={this.onTabValueChange}>
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
                        value={this.props.searchParameters.radiusInMeters}
                        minimumValue={DASHBOARD_MIN_SEARCH_DISTANCE_IN_METERS}
                        maximumValue={DASHBOARD_MAX_SEARCH_DISTANCE_IN_METERS}
                        step={DASHBOARD_STEP_SEARCH_DISTANCE_IN_METERS}
                        disabled={this.props.loading || this.props.refreshing || this.props.fetchingNew}
                        trackStyle={styles.trackStyle}
                        thumbStyle={styles.thumbStyle}
                        onSlidingComplete={(value) => this.onDashboardChangeSliderValue(value)} />
                    <Text style={styles.sliderValueStyle}>
                        {i18n.t(DASHBOARD_SEARCH_PARAMETERS_DISTANCE)}: {this.props.searchParameters.radiusInMeters / 1000} km
                    </Text>
                </View>
                {this.props.loading ?
                    <LostDogSummaryListItemPlaceholder /> :
                    <FlatList
                        data={this.props.data}
                        renderItem={(item) => {
                            const lastItem = item.index === this.props.data.length - 1;
                            return (
                                <Fragment>
                                    <LostDogSummaryListItem dog={item.item} />
                                    {(lastItem && this.props.fetchingNew &&
                                        <LostDogSummaryListItemPlaceholder /> )}
                                    {(lastItem && this.props.hasNoMoreData &&
                                        <LostDogSummaryEndIndicator />)}
                                </Fragment>
                            );
                        }}
                        keyExtractor={item => item.id.toString()}
                        onRefresh={this.props.onDashboardRefreshPage}
                        refreshing={this.props.refreshing}
                        onEndReachedThreshold={0.1}
                        onEndReached={this.onDashboardFetchNewPage} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    },
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
        backgroundColor: 'accent',
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

const mapStateToProps = (state) => {
    return {
        loading: state.dashboard.loading,
        refreshing: state.dashboard.refreshing,
        fetchingNew: state.dashboard.fetchingNew,
        hasNoMoreData: state.dashboard.hasNoMoreData,
        searchParameters: state.dashboard.searchParameters,
        data: state.dashboard.data,
        error: state.dashboard.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDashboardMounted: () => dispatch(onDashboardMounted()),
        onDashboardRefreshPage: () => dispatch(onDashboardRefreshPage()),
        onDashboardFetchNewPage: () => dispatch(onDashboardFetchNewPage()),
        onDashboardChangeSearchParams: (searchParameters) => dispatch(onDashboardChangeSearchParams(searchParameters))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);