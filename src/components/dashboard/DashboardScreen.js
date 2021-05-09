import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import DashboardHeader from './dashboard-header/DashboardHeader';
import DashboardList from './dashboard-list/DashboardList';
import LoadingCard from '../common/loading-card/LoadingCard';
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

const DashboardScreen = () => {

    const loading = useSelector(state => state.dashboard.loading);
    const refreshing = useSelector(state => state.dashboard.refreshing);
    const fetchingNew = useSelector(state => state.dashboard.fetchingNew);
    const hasNoMoreData = useSelector(state => state.dashboard.hasNoMoreData);
    const searchParameters = useSelector(state => state.dashboard.searchParameters);
    const data = useSelector(state => state.dashboard.data);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(onDashboardMounted());
    }, [])

    const isLoading = () => {
        return fetchingNew || loading || refreshing;
    }

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
                    onDashboardRefreshPage={() => dispatch(onDashboardRefreshPage())} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    }
});

DashboardScreen['navigationOptions'] = () => ({
    title: i18n.t(DASHBOARD_TITLE)
});

export default DashboardScreen;