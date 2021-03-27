import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import LostDogSummaryListItem from './lost-dog-summary-item/LostDogSummaryListItem';
import {connect} from 'react-redux';
import {onDashboardMounted} from '../../redux/actions/dashboard/action-creators/action.creators';
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
        return (
            <View style={{height: '100%', padding: 8}}>
                <FlatList
                    data={this.props.data}
                    renderItem={(item) => {
                        return (
                            <LostDogSummaryListItem dog={item.item}/>
                        );
                    }}
                    keyExtractor={item => item.id.toString()}
                />
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
        onDashboardMounted: () => dispatch(onDashboardMounted())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);