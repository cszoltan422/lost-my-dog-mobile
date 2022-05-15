import React from 'react';
import { FlatList } from 'react-native';
import DashboardListItem from './dashboard-list-item/dashboard-list-item';
import LoadingCard from '../../common/loading-card/loading-card';
import DashboardListEndIndicator from './dashboard-list-end-indicator/dashboard-list-end-indicator';
import DashboardListEmptyResult from './dashboard-list-empty-result/dashboard-list-empty-result';
import {LostDog} from '../../../service/search-lost-dogs-service';

interface IProps {
    data: LostDog[];
    dataFetched: boolean;
    fetchingNew: boolean;
    refreshing: boolean;
    hasNoMoreData: boolean;
    isLoading: () => boolean;
    onDashboardFetchNewPage: () => void;
    onDashboardRefreshPage: () => void;
    onListItemClicked: (dog: LostDog) => void;
}

const DashboardList = (props: IProps) => {

    const onDashboardFetchNewPage = () => {
        if (!props.hasNoMoreData && !props.isLoading()) {
            props.onDashboardFetchNewPage();
        }
    };

    return (
        <>
            {props.dataFetched && props.data.length === 0 ?
                <DashboardListEmptyResult />
                :
                <FlatList
                    testID='dashboard-list-container'
                    data={props.data}
                    renderItem={(item) => {
                        const lastItem = item.index === props.data.length - 1;
                        return (
                            <>
                                <DashboardListItem
                                    dog={item.item}
                                    index={item.index}
                                    onListItemClicked={props.onListItemClicked} />
                                {(lastItem && props.fetchingNew &&
                                    <LoadingCard /> )}
                                {(lastItem && props.hasNoMoreData &&
                                    <DashboardListEndIndicator />)}
                            </>
                        );
                    }}
                    keyExtractor={item => item.id.toString()}
                    onRefresh={props.onDashboardRefreshPage}
                    refreshing={props.refreshing}
                    onEndReachedThreshold={0.1}
                    onEndReached={onDashboardFetchNewPage} />
            }
        </>
    );
};

export default DashboardList;