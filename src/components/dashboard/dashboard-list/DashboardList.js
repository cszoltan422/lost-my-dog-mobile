import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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

DashboardList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        dogName: PropTypes.string.isRequired,
        dogBreed: PropTypes.string.isRequired,
        dateLost: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
        avatarFilename: PropTypes.string.isRequired
    })).isRequired,
    fetchingNew: PropTypes.bool.isRequired,
    refreshing: PropTypes.bool.isRequired,
    hasNoMoreData: PropTypes.bool.isRequired,
    isLoading: PropTypes.func.isRequired,
    onDashboardFetchNewPage: PropTypes.func.isRequired,
    onDashboardRefreshPage: PropTypes.func.isRequired
}

export default DashboardList;