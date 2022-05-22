import React from 'react';
import FloatingActionButton from '../../common/floating-action-button/floating-action-button';
import colors from '../../../colors';
import i18n from '../../../i18n/i18n';
import {useAppSelector} from '../../../redux/store/store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/lost-my-dog-navigator';

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'DashboardScreen'>;
}

const DashboardFloatingButton = (props: IProps) => {
    const user = useAppSelector(state => state.application.user);

    return (
        <FloatingActionButton
            color={colors.primaryColor}
            icon={{ name: 'add', color: colors.white }}
            openIcon={{ name: 'close', color: colors.white }}
            actions={[
                {
                    title: i18n.t('general.submitLostDog'),
                    icon: { name: 'add', color: colors.white },
                    color: colors.primaryColor,
                    pressHandler: () => {
                        props.navigation.navigate(user.isLoggedIn ?
                            'SubmitLostDogScreen'
                            : 'LoginScreen'
                        );
                    }
                }
            ]} />
    );
};

export default DashboardFloatingButton;