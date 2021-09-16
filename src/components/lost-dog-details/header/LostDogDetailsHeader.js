import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Card from '../../common/card/Card';
import i18n from '../../../i18n/i18n';
import {DETAILS_DOG_DESCRIPTION_LABEL_TITLE} from '../../../i18n/i18n.keys';
import colors from '../../../colors';

const LostDogDetailsHeader = () => {

    return (
        <>
            <Card>
                <TextInput />
            </Card>
            <Card styles={styles.descriptionCardStyle}>
                <TextInput
                    testID='details-screen-description-text-input'
                    style={styles.descriptionTextInputStyle}
                    multiline
                    placeholder={`${i18n.t(DETAILS_DOG_DESCRIPTION_LABEL_TITLE)}...`} />
            </Card>
        </>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        flex: 1,
        resizeMode: 'cover',
        height: 400
    },
    descriptionCardStyle: {
        height: 'auto',
        backgroundColor: colors.accentColor
    },
    descriptionTextStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        fontStyle: 'italic'
    },
    descriptionTextInputStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 14,
        fontStyle: 'italic',
        borderBottomWidth: 1
    }
});

export default LostDogDetailsHeader;