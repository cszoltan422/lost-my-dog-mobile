import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from '../../screens/DashboardScreen';
import DetailsScreen from '../../screens/DetailsScreen';
import LoginScreen from '../../screens/LoginScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import SubmitLostDogScreen from '../../screens/SubmitLostDogScreen';
import colors from '../../colors';
import {
    DASHBOARD_NAVIGATION_SCREEN_NAME,
    DETAILS_NAVIGATION_SCREEN_NAME,
    LOGIN_NAVIGATION_SCREEN_NAME, SIGN_UP_NAVIGATION_SCREEN_NAME, SUBMIT_DOG_NAVIGATION_SCREEN_NAME
} from '../../application.constants';

const routeConfigMap = {
    [DASHBOARD_NAVIGATION_SCREEN_NAME]: {
        screen: DashboardScreen
    },
    [DETAILS_NAVIGATION_SCREEN_NAME]: {
        screen: DetailsScreen
    },
    [LOGIN_NAVIGATION_SCREEN_NAME]: {
        screen: LoginScreen
    },
    [SUBMIT_DOG_NAVIGATION_SCREEN_NAME]: {
        screen: SubmitLostDogScreen
    },
    [SIGN_UP_NAVIGATION_SCREEN_NAME]: {
        screen: SignUpScreen
    }
};

const stackConfig = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.primaryColor
        },
        headerTintColor: 'white'
    }
};
const LostMyDogNavigator = createStackNavigator(routeConfigMap, stackConfig);

export default createAppContainer(LostMyDogNavigator);