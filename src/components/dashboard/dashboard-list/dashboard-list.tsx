import React from 'react';
import { FlatList } from 'react-native';
import DashboardListItem from './dashboard-list-item/dashboard-list-item';
import LoadingCard from '../../common/loading-card/loading-card';
import DashboardListEndIndicator from './dashboard-list-end-indicator/dashboard-list-end-indicator';
import DashboardListEmptyResult from './dashboard-list-empty-result/dashboard-list-empty-result';
import {LostDog} from '../../../service/search-lost-dogs-service';
import {useAppDispatch, useAppSelector} from '../../../redux/store/store';
import {dashboardIncrementPage, setDashboardPage} from '../../../redux/reducers/dashboard/dashboard-reducer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/lost-my-dog-navigator';

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'DashboardScreen'>;
}

const DashboardList = (props: IProps) => {
    const loading = useAppSelector(state => state.dashboard.loading);
    const refreshing = useAppSelector(state => state.dashboard.refreshing);
    const fetchingNew = useAppSelector(state => state.dashboard.fetchingNew);
    const hasNoMoreData = useAppSelector(state => state.dashboard.hasNoMoreData);
    const dataFetched = useAppSelector(state => state.dashboard.dataFetched);
    const data = useAppSelector(state => state.dashboard.data);


    const dispatch = useAppDispatch();

    const isLoading = loading || refreshing || fetchingNew;

    const onDashboardFetchNewPage = () => {
        if (!hasNoMoreData && !isLoading) {
            dispatch(dashboardIncrementPage());
        }
    };

    return (
        <>
            {dataFetched && data.length === 0 ?
                <DashboardListEmptyResult />
                :
                <FlatList
                    testID='dashboard-list-container'
                    data={data}
                    renderItem={(item) => {
                        const lastItem = item.index === data.length - 1;
                        return (
                            <>
                                <DashboardListItem
                                    dog={item.item}
                                    index={item.index}
                                    onListItemClicked={(dog: LostDog) => {
                                        props.navigation.navigate('DetailsScreen', {
                                            dog: dog
                                        });
                                    }} />
                                {(lastItem && fetchingNew &&
                                    <LoadingCard /> )}
                                {(lastItem && hasNoMoreData &&
                                    <DashboardListEndIndicator />)}
                            </>
                        );
                    }}
                    keyExtractor={item => item.id.toString()}
                    onRefresh={() => dispatch(setDashboardPage(0))}
                    refreshing={refreshing}
                    onEndReachedThreshold={0.1}
                    onEndReached={onDashboardFetchNewPage} />
            }
        </>
    );
};

export default DashboardList;