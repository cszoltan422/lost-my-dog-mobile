import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import DashboardListItem from './dashboard-list-item/DashboardListItem';
import LoadingCard from '../../common/loading-card/LoadingCard';
import DashboardListEndIndicator from './dashboard-list-end-indicator/DashboardListEndIndicator';
import DashboardListEmptyResult from './dashboard-list-empty-result/DashboardListEmptyResult';

const DashboardList = (props) => {

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

DashboardList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        dogName: PropTypes.string.isRequired,
        dogBreed: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
        dateLost: PropTypes.string.isRequired,
        contactPhone: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
        avatarFilename: PropTypes.string.isRequired
    })).isRequired,
    dataFetched: PropTypes.bool.isRequired,
    fetchingNew: PropTypes.bool.isRequired,
    refreshing: PropTypes.bool.isRequired,
    hasNoMoreData: PropTypes.bool.isRequired,
    isLoading: PropTypes.func.isRequired,
    onDashboardFetchNewPage: PropTypes.func.isRequired,
    onDashboardRefreshPage: PropTypes.func.isRequired,
    onListItemClicked: PropTypes.func.isRequired
};

export default DashboardList;