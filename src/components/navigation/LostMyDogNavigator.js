import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from '../dashboard/DashboardScreen';
import DetailsScreen from '../details/DetailsScreen';
import LoginScreen from '../login/LoginScreen';
import colors from '../../colors';
import {
    DASHBOARD_NAVIGATION_SCREEN_NAME,
    DETAILS_NAVIGATION_SCREEN_NAME,
    LOGIN_NAVIGATION_SCREEN_NAME
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