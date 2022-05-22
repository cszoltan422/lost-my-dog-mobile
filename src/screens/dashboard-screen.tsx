import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import DashboardHeader from '../components/dashboard/dashboard-header/dashboard-header';
import DashboardList from '../components/dashboard/dashboard-list/dashboard-list';
import LoadingCard from '../components/common/loading-card/loading-card';
import Toast from 'react-native-toast-message';
import i18n from '../i18n/i18n';
import {useComponentDidMount} from '../hooks/useComponentDidMount';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {RootStackParamList} from '../components/navigation/lost-my-dog-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {dashboardMounted, setDashboardShowError} from '../redux/reducers/dashboard/dashboard-reducer';
import DashboardFloatingButton from '../components/dashboard/floating-button/dashboard-floating-button';

type IProps = NativeStackScreenProps<RootStackParamList, 'DashboardScreen'>;

const DashboardScreen = (props: IProps) => {
    const { navigation } = props;

    const loading = useAppSelector(state => state.dashboard.loading);
    const error = useAppSelector(state => state.dashboard.error);

    const dispatch = useAppDispatch();

    useComponentDidMount(() => {
        dispatch(dashboardMounted());
    });

    useEffect(() => {
        if (error.show) {
            Toast.show({
                position: 'bottom',
                type: 'error',
                text1: i18n.t('toast.headerText'),
                text2: i18n.t('toast.unknownError'),
                autoHide: false,
                onHide: () => dispatch(setDashboardShowError(false)),
            });
        }
    }, [error]);

    return (
        <View style={styles.container}>
            <DashboardHeader />
            {loading ?
                <LoadingCard /> :
                <DashboardList navigation={navigation} /> }
            <DashboardFloatingButton navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    }
});

export default DashboardScreen;