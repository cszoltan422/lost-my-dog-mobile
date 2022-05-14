import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../../screens/DashboardScreen';
import DetailsScreen from '../../screens/DetailsScreen';
import LoginScreen from '../../screens/login-screen';
import SignupScreen from '../../screens/signup-screen';
import SubmitLostDogScreen from '../../screens/SubmitLostDogScreen';
import EditLostDogScreen from '../../screens/EditLostDogScreen';
import colors from '../../colors';
import {
    DASHBOARD_NAVIGATION_SCREEN_NAME,
    DETAILS_NAVIGATION_SCREEN_NAME, EDIT_DOG_NAVIGATION_SCREEN_NAME,
    LOGIN_NAVIGATION_SCREEN_NAME, SIGN_UP_NAVIGATION_SCREEN_NAME, SUBMIT_DOG_NAVIGATION_SCREEN_NAME
} from '../../application.constants';
import i18n from '../../i18n/i18n';
import LostDogDetailsNavigationHeader from '../lost-dog-details/navigation-header/LostDogDetailsNavigationHeader';

const Stack = createNativeStackNavigator();

const LostMyDogNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.primaryColor
            },
            headerTintColor: 'white'
        }}>
            <Stack.Screen
                name={DASHBOARD_NAVIGATION_SCREEN_NAME}
                component={DashboardScreen}
                options={{
                    title: i18n.t('general.dashboard')
                }} />
            <Stack.Screen
                name={DETAILS_NAVIGATION_SCREEN_NAME}
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
                name={SUBMIT_DOG_NAVIGATION_SCREEN_NAME}
                component={SubmitLostDogScreen}
                options={{
                    title: i18n.t('general.submitLostDog')
                }} />
            <Stack.Screen
                name={EDIT_DOG_NAVIGATION_SCREEN_NAME}
                component={EditLostDogScreen}
                options={({ route }) => {
                    const { dog } = route.params;
                    return {
                        title: dog.dogName,
                        headerBackTitleVisible: false,
                    };
                }} />
            <Stack.Screen
                name={SIGN_UP_NAVIGATION_SCREEN_NAME}
                component={SignupScreen}
                options={{
                    title: i18n.t('general.signUp'),
                    headerBackTitleVisible: false
                }} />
            <Stack.Screen
                name={LOGIN_NAVIGATION_SCREEN_NAME}
                component={LoginScreen}
                options={{
                    title: i18n.t('general.login'),
                    headerBackTitleVisible: false,
                }} />
        </Stack.Navigator>
    );
};

export default LostMyDogNavigator;