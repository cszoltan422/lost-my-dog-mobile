import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DashboardHeader from '../components/dashboard/dashboard-header/DashboardHeader';
import DashboardList from '../components/dashboard/dashboard-list/DashboardList';
import LoadingCard from '../components/common/loading-card/LoadingCard';
import FloatingActionButton from '../components/common/floating-action-button/FloatingActionButton';
import {
    onDashboardChangeRadiusSearchParam,
    onDashboardChangeSearchTypeParam,
    onDashboardFetchNewPage,
    onDashboardMounted,
    onDashboardRefreshPage
} from '../redux/actions/dashboard/action-creators/action.creators';
import {
    DASHBOARD_TITLE, SUBMIT_DOG_TITLE
} from '../i18n/i18n.keys';
import i18n from '../i18n/i18n';
import {
    DETAILS_NAVIGATION_PARAM_NAME,
    DETAILS_NAVIGATION_SCREEN_NAME,
    LOGIN_NAVIGATION_SCREEN_NAME,
    SUBMIT_DOG_NAVIGATION_SCREEN_NAME
} from '../application.constants';
import colors from '../colors';
import {useComponentDidMount} from "../hooks/useComponentDidMount";

const DashboardScreen = (props) => {

    const loading = useSelector(state => state.dashboard.loading);
    const refreshing = useSelector(state => state.dashboard.refreshing);
    const fetchingNew = useSelector(state => state.dashboard.fetchingNew);
    const hasNoMoreData = useSelector(state => state.dashboard.hasNoMoreData);
    const searchParameters = useSelector(state => state.dashboard.searchParameters);
    const data = useSelector(state => state.dashboard.data);
    const user = useSelector(state => state.application.user);

    const dispatch = useDispatch();

    useComponentDidMount(() => {
        dispatch(onDashboardMounted());
    });

    const isLoading = () => {
        return fetchingNew || loading || refreshing;
    };

    return (
        <View style={styles.container}>
            <DashboardHeader
                loading={loading}
                refreshing={refreshing}
                fetchingNew={fetchingNew}
                searchParameters={searchParameters}
                isLoading={isLoading}
                onDashboardChangeRadiusSearchParam={(radius) => dispatch(onDashboardChangeRadiusSearchParam(radius))}
                onDashboardChangeSearchTypeParam={(searchType) => dispatch(onDashboardChangeSearchTypeParam(searchType))} />
            {loading ?
                <LoadingCard /> :
                <DashboardList
                    data={data}
                    fetchingNew={fetchingNew}
                    refreshing={refreshing}
                    hasNoMoreData={hasNoMoreData}
                    isLoading={isLoading}
                    onDashboardFetchNewPage={() => dispatch(onDashboardFetchNewPage())}
                    onDashboardRefreshPage={() => dispatch(onDashboardRefreshPage())}
                    onListItemClicked={(item) => props.navigation.navigate({
                        routeName: DETAILS_NAVIGATION_SCREEN_NAME,
                        params: {[DETAILS_NAVIGATION_PARAM_NAME]: item}
                    })} /> }
            <FloatingActionButton
                color={colors.primaryColor}
                icon={{ name: 'add', color: colors.white }}
                openIcon={{ name: 'close', color: colors.white }}
                actions={[
                    {
                        title: i18n.t(SUBMIT_DOG_TITLE),
                        icon: { name: 'add', color: colors.white },
                        color: colors.primaryColor,
                        pressHandler: () => {
                            props.navigation.navigate({
                                routeName: user.isLoggedIn ?
                                    SUBMIT_DOG_NAVIGATION_SCREEN_NAME
                                    : LOGIN_NAVIGATION_SCREEN_NAME
                            });
                        }
                    }
                ]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    }
});

DashboardScreen['navigationOptions'] = () => ({
    title: i18n.t(DASHBOARD_TITLE)
});

DashboardScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default DashboardScreen;