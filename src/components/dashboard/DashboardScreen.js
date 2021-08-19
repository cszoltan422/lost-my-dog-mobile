import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import DashboardHeader from './dashboard-header/DashboardHeader';
import DashboardList from './dashboard-list/DashboardList';
import LoadingCard from '../common/loading-card/LoadingCard';
import HeaderMenu from '../menu/HeaderMenu';
import {
    onDashboardChangeRadiusSearchParam,
    onDashboardChangeSearchTypeParam,
    onDashboardFetchNewPage,
    onDashboardMounted,
    onDashboardRefreshPage
} from '../../redux/actions/dashboard/action-creators/action.creators';
import {
    DASHBOARD_TITLE
} from '../../i18n/i18n.keys';
import i18n from '../../i18n/i18n';
import {
    DETAILS_NAVIGATION_PARAM_NAME,
    DETAILS_NAVIGATION_SCREEN_NAME
} from '../../application.constants';

class DashboardScreen extends Component {

    componentDidMount() {
        this.props.onDashboardMounted();
        this.setUserParam();
    }

    isLoading = () => {
        return this.props.fetchingNew || this.props.loading || this.props.refreshing;
    };

    setUserParam = () => {
        this.props.navigation.setParams({
            user: this.props.user
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <DashboardHeader
                    loading={this.props.loading}
                    refreshing={this.props.refreshing}
                    fetchingNew={this.props.fetchingNew}
                    searchParameters={this.props.searchParameters}
                    isLoading={this.isLoading}
                    onDashboardChangeRadiusSearchParam={(radius) => this.props.onDashboardChangeRadiusSearchParam(radius)}
                    onDashboardChangeSearchTypeParam={(searchType) => this.props.onDashboardChangeSearchTypeParam(searchType)} />
                {this.props.loading ?
                    <LoadingCard /> :
                    <DashboardList
                        data={this.props.data}
                        fetchingNew={this.props.fetchingNew}
                        refreshing={this.props.refreshing}
                        hasNoMoreData={this.props.hasNoMoreData}
                        isLoading={this.isLoading}
                        onDashboardFetchNewPage={() => this.props.onDashboardFetchNewPage()}
                        onDashboardRefreshPage={() => this.props.onDashboardRefreshPage()}
                        onListItemClicked={(item) => this.props.navigation.navigate({
                            routeName: DETAILS_NAVIGATION_SCREEN_NAME,
                            params: {[DETAILS_NAVIGATION_PARAM_NAME]: item}
                        })} /> }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    }
});

DashboardScreen['navigationOptions'] = ({ navigation }) => ({
    title: i18n.t(DASHBOARD_TITLE),
    headerRight: () => <HeaderMenu navigation={navigation} /> // eslint-disable-line
});

DashboardScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    refreshing: PropTypes.bool.isRequired,
    fetchingNew: PropTypes.bool.isRequired,
    hasNoMoreData: PropTypes.bool.isRequired,
    searchParameters: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    user: PropTypes.bool.isRequired,
    onDashboardChangeRadiusSearchParam: PropTypes.func.isRequired,
    onDashboardChangeSearchTypeParam: PropTypes.func.isRequired,
    onDashboardMounted: PropTypes.func.isRequired,
    onDashboardFetchNewPage: PropTypes.func.isRequired,
    onDashboardRefreshPage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        loading: state.dashboard.loading,
        refreshing: state.dashboard.refreshing,
        fetchingNew: state.dashboard.fetchingNew,
        hasNoMoreData: state.dashboard.hasNoMoreData,
        searchParameters: state.dashboard.searchParameters,
        data: state.dashboard.data,
        user: state.application.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDashboardChangeRadiusSearchParam: (radius) => dispatch(onDashboardChangeRadiusSearchParam(radius)),
        onDashboardChangeSearchTypeParam: (searchType) => dispatch(onDashboardChangeSearchTypeParam(searchType)),
        onDashboardMounted: () => dispatch(onDashboardMounted()),
        onDashboardFetchNewPage: () => dispatch(onDashboardFetchNewPage()),
        onDashboardRefreshPage: () => dispatch(onDashboardRefreshPage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);