import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import DashboardHeader from './dashboard-header/DashboardHeader';
import DashboardList from './dashboard-list/DashboardList';
import LoadingCard from '../common/loading-card/LoadingCard';
import FloatingActionButton from '../common/floating-action-button/FloatingActionButton';
import HeaderMenu from '../menu/HeaderMenu';
import {
    onDashboardChangeRadiusSearchParam,
    onDashboardChangeSearchTypeParam,
    onDashboardFetchNewPage,
    onDashboardMounted,
    onDashboardRefreshPage
} from '../../redux/actions/dashboard/action-creators/action.creators';
import {
    DASHBOARD_TITLE, SUBMIT_DOG_TITLE
} from '../../i18n/i18n.keys';
import i18n from '../../i18n/i18n';
import {
    DETAILS_NAVIGATION_PARAM_NAME,
    DETAILS_NAVIGATION_SCREEN_NAME, SUBMIT_DOG_NAVIGATION_PARAM_NAME
} from '../../application.constants';
import colors from '../../colors';

class DashboardScreen extends Component {

    componentDidMount() {
        this.props.onDashboardMounted();
    }

    isLoading = () => {
        return this.props.fetchingNew || this.props.loading || this.props.refreshing;
    };

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
                {this.props.user.isLoggedIn ?
                    <FloatingActionButton
                        color={colors.primaryColor}
                        icon={{ name: 'add', color: colors.white }}
                        openIcon={{ name: 'close', color: colors.white }}
                        actions={[
                            {
                                title: i18n.t(SUBMIT_DOG_TITLE),
                                icon: { name: 'add', color: colors.white },
                                color: colors.primaryColor,
                                pressHandler: () => this.props.navigation.navigate({
                                    routeName: SUBMIT_DOG_NAVIGATION_PARAM_NAME
                                })
                            }
                        ]} />
                : null }
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
    user: PropTypes.object.isRequired,
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
        user: state.application.user,
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