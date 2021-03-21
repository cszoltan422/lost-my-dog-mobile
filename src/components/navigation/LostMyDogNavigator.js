import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import HomeScreen from '../../screens/HomeScreen';
import colors from '../../colors';

const LostMyDogNavigator = createStackNavigator({
    'home': {
        screen: HomeScreen
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