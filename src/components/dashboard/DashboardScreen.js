import React, { Component, Fragment } from 'react';
import {View, FlatList, Text} from 'react-native';
import LostDogSummaryListItem from './lost-dog-summary-item/LostDogSummaryListItem';
import LostDogSummaryListItemPlaceholder from './lost-dog-summary-item/LostDogSummaryListItemPlaceholder';
import LostDogSummaryEndIndicator from './lost-dog-summary-item/LostDogSummaryEndIndicator';
import { Slider } from 'react-native-elements';
import {connect} from 'react-redux';
import {
    onDashboardChangeSearchParams,
    onDashboardFetchNewPage,
    onDashboardMounted,
    onDashboardRefreshPage
} from '../../redux/actions/dashboard/action-creators/action.creators';
import {DASHBOARD_SEARCH_PARAMETERS_DISTANCE, DASHBOARD_TITLE} from '../../i18n/i18n.keys';
import i18n from '../../i18n/i18n';
import colors from "../../colors";
import {
    DASHBOARD_MAX_SEARCH_DISTANCE_IN_METERS,
    DASHBOARD_MIN_SEARCH_DISTANCE_IN_METERS, DASHBOARD_STEP_SEARCH_DISTANCE_IN_METERS
} from "../../application.constants";

class DashboardScreen extends Component {

    constructor(props) {
        super(props);

        this.onDashboardFetchNewPage = this.onDashboardFetchNewPage.bind(this);
        this.onDashboardChangeSliderValue = this.onDashboardChangeSliderValue.bind(this);
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
        if (!this.props.hasNoMoreData && !this.props.fetchingNew && !this.props.loading && !this.props.refreshing) {
            this.props.onDashboardFetchNewPage();
        }
    }

    onDashboardChangeSliderValue(value) {
        if (!this.props.fetchingNew && !this.props.loading && !this.props.refreshing) {
            this.props.onDashboardChangeSearchParams({
                radiusInMeters: value,
                searchType: this.props.searchParameters.searchType
            });
        }
    }

    render() {
        return (
            <View style={{height: '100%', padding: 8}}>
                <Slider
                    value={this.props.searchParameters.radiusInMeters}
                    minimumValue={DASHBOARD_MIN_SEARCH_DISTANCE_IN_METERS}
                    maximumValue={DASHBOARD_MAX_SEARCH_DISTANCE_IN_METERS}
                    step={DASHBOARD_STEP_SEARCH_DISTANCE_IN_METERS}
                    disabled={this.props.loading || this.props.refreshing || this.props.fetchingNew}
                    trackStyle={{ height: 5, backgroundColor: colors.primaryColor, color: colors.primaryColor }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: colors.primaryColor }}
                    onSlidingComplete={(value) => this.onDashboardChangeSliderValue(value)}/>
                <Text style={{marginBottom: 8}}>
                    {i18n.t(DASHBOARD_SEARCH_PARAMETERS_DISTANCE)} {this.props.searchParameters.radiusInMeters / 1000} km
                </Text>
                {this.props.loading ?
                    <LostDogSummaryListItemPlaceholder /> :
                    <FlatList
                        data={this.props.data}
                        renderItem={(item) => {
                            const lastItem = item.index === this.props.data.length - 1;
                            return (
                                <Fragment>
                                    <LostDogSummaryListItem dog={item.item}/>
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