import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../../screens/DashboardScreen';
import DetailsScreen from '../../screens/DetailsScreen';
import LoginScreen from '../../screens/LoginScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import SubmitLostDogScreen from '../../screens/SubmitLostDogScreen';
import EditLostDogScreen from '../../screens/EditLostDogScreen';
import colors from '../../colors';
import {
    DASHBOARD_NAVIGATION_SCREEN_NAME,
    DETAILS_NAVIGATION_SCREEN_NAME, EDIT_DOG_NAVIGATION_SCREEN_NAME,
    LOGIN_NAVIGATION_SCREEN_NAME, SIGN_UP_NAVIGATION_SCREEN_NAME, SUBMIT_DOG_NAVIGATION_SCREEN_NAME
} from '../../application.constants';
import i18n from '../../i18n/i18n';
import {DASHBOARD_TITLE, LOGIN_LOGIN_TEXT, SIGN_UP_SCREEN_TITLE, SUBMIT_DOG_TITLE} from '../../i18n/i18n.keys';
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
                    title: i18n.t(DASHBOARD_TITLE)
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
                    title: i18n.t(SUBMIT_DOG_TITLE)
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
                component={SignUpScreen}
                options={{
                    title: i18n.t(SIGN_UP_SCREEN_TITLE),
                    headerBackTitleVisible: false
                }} />
            <Stack.Screen
                name={LOGIN_NAVIGATION_SCREEN_NAME}
                component={LoginScreen}
                options={{
                    title: i18n.t(LOGIN_LOGIN_TEXT),
                    headerBackTitleVisible: false,
                }} />
        </Stack.Navigator>
    );
};

export default LostMyDogNavigator;