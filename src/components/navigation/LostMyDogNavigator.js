import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import HomeScreen from '../../screens/HomeScreen';
import colors from '../../colors';

const LostMyDogNavigator = createStackNavigator({
    'home': HomeScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'andriod' ? 'black' : colors.primaryColor
    }
});

export default createAppContainer(LostMyDogNavigator);