import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../../screens/dashboard-screen';
import DetailsScreen from '../../screens/details-screen';
import LoginScreen from '../../screens/login-screen';
import SignupScreen from '../../screens/signup-screen';
import SubmitLostDogScreen from '../../screens/submit-lost-dog-screen';
import EditLostDogScreen from '../../screens/edit-lost-dog-screen';
import colors from '../../colors';
import i18n from '../../i18n/i18n';
import LostDogDetailsNavigationHeader from '../lost-dog-details/navigation-header/lost-dog-details-navigation-header';
import {LostDog} from '../../service/search-lost-dogs-service';

export type RootStackParamList = {
    DashboardScreen: undefined;
    DetailsScreen: { dog: LostDog };
    SubmitLostDogScreen: undefined;
    EditLostDogScreen: { dog: LostDog };
    SignupScreen: undefined;
    LoginScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const LostMyDogNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.primaryColor
            },
            headerTintColor: 'white'
        }}>
            <Stack.Screen
                name='DashboardScreen'
                component={DashboardScreen}
                options={{
                    title: i18n.t('general.dashboard')
                }} />
            <Stack.Screen
                name='DetailsScreen'
                component={DetailsScreen}
                options={({ route, navigation }) => {
                    const { dog } = route.params;
                    return {
                        title: dog.dogName,
                        headerBackTitleVisible: false,
                        // eslint-disable-next-line
                        headerRight: () => (
                            <LostDogDetailsNavigationHeader
                                navigation={navigation}
                                dog={dog} />
                        )
                    };
                }} />
            <Stack.Screen
                name='SubmitLostDogScreen'
                component={SubmitLostDogScreen}
                options={{
                    title: i18n.t('general.submitLostDog')
                }} />
            <Stack.Screen
                name='EditLostDogScreen'
                component={EditLostDogScreen}
                options={({ route }) => {
                    const { dog } = route.params;
                    return {
                        title: dog.dogName,
                        headerBackTitleVisible: false,
                    };
                }} />
            <Stack.Screen
                name='SignupScreen'
                component={SignupScreen}
                options={{
                    title: i18n.t('general.signUp'),
                    headerBackTitleVisible: false
                }} />
            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
                options={{
                    title: i18n.t('general.login'),
                    headerBackTitleVisible: false,
                }} />
        </Stack.Navigator>
    );
};

export default LostMyDogNavigator;