import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import Card from '../../common/card/Card';
import CameraImagePicker from '../../common/image-picker/CameraImagePicker';
import i18n from '../../../i18n/i18n';
import {DETAILS_DOG_DESCRIPTION_LABEL_TITLE} from '../../../i18n/i18n.keys';
import colors from '../../../colors';

const LostDogDetailsHeader = (props) => {

    return (
        <>
            <Card>
                <CameraImagePicker
                    selectedImageUri={props.selectedImageUri}
                    onImageSelected={props.onImageSelected} />
            </Card>
            {props.selectedImageUri ?
                <Card>
                    <Button
                        buttonStyle={styles.clearImageButtonStyle}
                        titleStyle={{color: colors.white}}
                        title='Clear image'
                        onPress={() => props.onImageSelected(null)} />
                </Card>
                : null
            }
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
    },
    clearImageButtonStyle: {
        marginStart: 8,
        marginEnd: 8,
        backgroundColor: colors.accentColor,
        width: '60%',
        alignSelf: 'center'
    },
});

LostDogDetailsHeader.propTypes = {
    selectedImageUri: PropTypes.string,
    onImageSelected: PropTypes.func.isRequired
};

export default LostDogDetailsHeader;