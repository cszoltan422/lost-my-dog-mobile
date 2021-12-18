import React from 'react';
import {StyleSheet, View} from "react-native";
import {Icon} from "react-native-elements";
import colors from "../../../colors";
import {EDIT_DOG_NAVIGATION_SCREEN_NAME} from "../../../application.constants";
import {useSelector} from "react-redux";

const LostDogDetailsNavigationHeader = (props) => {

    const user = useSelector(state => state.application.user);
    const shouldShowSubmissionEditIcon = user.isLoggedIn && user.details.id === props.dog.submittedByUserId;

    return (
        <View style={styles.headerRight}>
            {shouldShowSubmissionEditIcon && (
                <Icon
                    testID='details-screen-edit-own-submission-button'
                    type='material'
                    name='mode-edit'
                    color={colors.white}
                    onPress={() => props.navigation.replace({
                        routeName: EDIT_DOG_NAVIGATION_SCREEN_NAME,
                        params: {[EDIT_DOG_NAVIGATION_SCREEN_NAME]: props.dog}
                    })}/>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    headerRight: {
        marginEnd: 16
    }
});

export default LostDogDetailsNavigationHeader;