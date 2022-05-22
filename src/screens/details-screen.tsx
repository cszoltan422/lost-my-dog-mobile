import React from 'react';
import {Linking} from 'react-native';
import LostDogDetailsReadonly from '../components/lost-dog-details/lost-dog-details-readonly';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/navigation/lost-my-dog-navigator';

type IProps = NativeStackScreenProps<RootStackParamList, 'DetailsScreen'>;

const DetailsScreen = (props: IProps) => {
    const { route } = props;
    const { dog } = route.params;

    const onCallOwnerButtonPressed = () => {
        Linking.openURL(`tel:${dog.contactPhone}`);
    };

    const onSendOwnerButtonPressed = () => {
        Linking.openURL(`mailto:${dog.contactEmail}`);
    };

    return (
        <LostDogDetailsReadonly
            dog={dog}
            onSendOwnerButtonPressed={onSendOwnerButtonPressed}
            onCallOwnerButtonPressed={onCallOwnerButtonPressed} />
    );
};

export default DetailsScreen;
