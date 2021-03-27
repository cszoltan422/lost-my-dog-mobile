import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import LostDogSummaryListItem from './lost-dog-summary-item/LostDogSummaryListItem';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {connect} from 'react-redux';
import {
    onDashboardMounted,
    onDashboardRefreshPage
} from '../../redux/actions/dashboard/action-creators/action.creators';
import {DASHBOARD_TITLE} from '../../i18n/i18n.keys';
import i18n from '../../i18n/i18n';

class DashboardScreen extends Component {

    componentDidMount() {
        this.props.onDashboardMounted();
    }

    static navigationOptions = () => {
        return {
            title: i18n.t(DASHBOARD_TITLE)
        };
    };

    render() {
        let content;
        if (this.props.loading) {
            content = (
                <SkeletonPlaceholder highlightColor='#ffffff' backgroundColor='#cfd8dc'  >
                    <SkeletonPlaceholder.Item height={110} marginBottom={8}  borderRadius={16} />
                    <SkeletonPlaceholder.Item height={110} marginBottom={8}  borderRadius={16} />
                </SkeletonPlaceholder>
            );
        } else {
            content = (
                <FlatList
                    data={this.props.data}
                    renderItem={(item) => {
                        return (
                            <LostDogSummaryListItem dog={item.item}/>
                        );
                    }}
                    keyExtractor={item => item.id.toString()}
                    onRefresh={() => this.props.onDashboardRefreshPage()}
                    refreshing={this.props.refreshing} />
            );
        }
        return (
            <View style={{height: '100%', padding: 8}}>
                {content}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);