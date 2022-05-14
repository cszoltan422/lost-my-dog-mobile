import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DashboardHeader from '../components/dashboard/dashboard-header/DashboardHeader';
import DashboardList from '../components/dashboard/dashboard-list/DashboardList';
import LoadingCard from '../components/common/loading-card/loading-card';
import FloatingActionButton from '../components/common/floating-action-button/floating-action-button';
import Toast from 'react-native-toast-message';
import {
    onDashboardChangeRadiusSearchParam,
    onDashboardChangeSearchTypeParam,
    onDashboardFetchNewPage,
    onDashboardHideAlert,
    onDashboardMounted,
    onDashboardRefreshPage
} from '../redux/actions/dashboard/action-creators/action-creators';
import i18n from '../i18n/i18n';
import {
    DETAILS_NAVIGATION_SCREEN_NAME,
    LOGIN_NAVIGATION_SCREEN_NAME,
    SUBMIT_DOG_NAVIGATION_SCREEN_NAME
} from '../application.constants';
import colors from '../colors';
import {useComponentDidMount} from '../hooks/useComponentDidMount';

const DashboardScreen = (props) => {

    const { navigation } = props;

    const dataFetched = useSelector(state => state.dashboard.dataFetched);
    const loading = useSelector(state => state.dashboard.loading);
    const refreshing = useSelector(state => state.dashboard.refreshing);
    const fetchingNew = useSelector(state => state.dashboard.fetchingNew);
    const hasNoMoreData = useSelector(state => state.dashboard.hasNoMoreData);
    const searchParameters = useSelector(state => state.dashboard.searchParameters);
    const data = useSelector(state => state.dashboard.data);
    const error = useSelector(state => state.dashboard.error);
    const user = useSelector(state => state.application.user);

    const dispatch = useDispatch();

    useComponentDidMount(() => {
        dispatch(onDashboardMounted());
    });

    useEffect(() => {
        if (error.show) {
            Toast.show({
                position: 'bottom',
                type: 'error',
                text1: i18n.t('toast.headerText'),
                text2: i18n.t('toast.unknownError'),
                autoHide: false,
                onHide: () => dispatch(onDashboardHideAlert()),
            });
        }
    }, [error]);

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
                    dataFetched={dataFetched}
                    data={data}
                    fetchingNew={fetchingNew}
                    refreshing={refreshing}
                    hasNoMoreData={hasNoMoreData}
                    isLoading={isLoading}
                    onDashboardFetchNewPage={() => dispatch(onDashboardFetchNewPage())}
                    onDashboardRefreshPage={() => dispatch(onDashboardRefreshPage())}
                    onListItemClicked={(item) => props.navigation.navigate(
                        DETAILS_NAVIGATION_SCREEN_NAME, {
                            dog: item
                        }, null, null)} /> }
            <FloatingActionButton
                color={colors.primaryColor}
                icon={{ name: 'add', color: colors.white }}
                openIcon={{ name: 'close', color: colors.white }}
                actions={[
                    {
                        title: i18n.t('general.submitLostDog'),
                        icon: { name: 'add', color: colors.white },
                        color: colors.primaryColor,
                        pressHandler: () => {
                            navigation.navigate(user.isLoggedIn ?
                                SUBMIT_DOG_NAVIGATION_SCREEN_NAME
                                : LOGIN_NAVIGATION_SCREEN_NAME
                            );
                        }
                    }
                ]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    }
});

DashboardScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default DashboardScreen;