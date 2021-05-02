import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from '../../components/dashboard/DashboardScreen';
import colors from '../../colors';
import {DASHBOARD_NAVIGATION_SCREEN_NAME} from '../../application.constants';

const LostMyDogNavigator = createStackNavigator({
    [DASHBOARD_NAVIGATION_SCREEN_NAME]: {
        screen: DashboardScreen
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.primaryColor
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(LostMyDogNavigator);