import React, { Component, Fragment } from 'react';
import {View, FlatList} from 'react-native';
import LostDogSummaryListItem from './lost-dog-summary-item/LostDogSummaryListItem';
import LostDogSummaryListItemPlaceholder from './lost-dog-summary-item/LostDogSummaryListItemPlaceholder';
import LostDogSummaryEndIndicator from './lost-dog-summary-item/LostDogSummaryEndIndicator';
import {connect} from 'react-redux';
import {
    onDashboardFetchNewPage,
    onDashboardMounted,
    onDashboardRefreshPage
} from '../../redux/actions/dashboard/action-creators/action.creators';
import {DASHBOARD_TITLE} from '../../i18n/i18n.keys';
import i18n from '../../i18n/i18n';

class DashboardScreen extends Component {

    constructor(props) {
        super(props);

        this.onDashboardFetchNewPage = this.onDashboardFetchNewPage.bind(this);
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

    render() {
        return (
            <View style={{height: '100%', padding: 8}}>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);