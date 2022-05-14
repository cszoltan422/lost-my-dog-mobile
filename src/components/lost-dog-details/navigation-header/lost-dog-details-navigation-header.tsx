import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../../colors';
import {EDIT_DOG_NAVIGATION_SCREEN_NAME} from '../../../application.constants';
import {LostDog} from '../../../service/search-lost-dogs-service';
import {useAppSelector} from '../../../redux/store/store';
import {Icon} from '@rneui/base';

interface IProps {
    dog: LostDog;
    navigation: any;
}

const LostDogDetailsNavigationHeader = (props: IProps) => {

    const user = useAppSelector(state => state.application.user);
    const shouldShowSubmissionEditIcon = user.isLoggedIn && user.details?.id === props.dog.submittedByUserId;

    return (
        <View style={styles.headerRight}>
            {shouldShowSubmissionEditIcon && (
                <Icon
                    testID='details-screen-edit-own-submission-button'
                    type='material'
                    name='mode-edit'
                    color={colors.white}
                    onPress={() => props.navigation.replace(EDIT_DOG_NAVIGATION_SCREEN_NAME, {
                        dog: props.dog
                    })} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    headerRight: {
        marginEnd: 16
    }
});

export default LostDogDetailsNavigationHeader;