import React, { Fragment } from 'react';
import { FlatList } from 'react-native';
import DashboardListItem from './dashboard-list-item/DashboardListItem';
import LoadingCard from '../../common/loading-card/LoadingCard';
import DashboardListEndIndicator from './dashboard-list-end-indicator/DashboardListEndIndicator';

const DashboardList = (props) => {

    const onDashboardFetchNewPage = () => {
        if (!props.hasNoMoreData && !props.isLoading()) {
            props.onDashboardFetchNewPage();
        }
    }

    return (
        <FlatList
            data={props.data}
            renderItem={(item) => {
                const lastItem = item.index === props.data.length - 1;
                return (
                    <Fragment>
                        <DashboardListItem dog={item.item} />
                        {(lastItem && props.fetchingNew &&
                            <LoadingCard /> )}
                        {(lastItem && props.hasNoMoreData &&
                            <DashboardListEndIndicator />)}
                    </Fragment>
                );
            }}
            keyExtractor={item => item.id.toString()}
            onRefresh={props.onDashboardRefreshPage}
            refreshing={props.refreshing}
            onEndReachedThreshold={0.1}
            onEndReached={onDashboardFetchNewPage} />
    );
};

export default DashboardList;