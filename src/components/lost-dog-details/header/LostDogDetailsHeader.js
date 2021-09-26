import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Card from '../../common/card/Card';
import CameraImagePicker from '../../common/image-picker/CameraImagePicker';
import colors from '../../../colors';
import i18n from '../../../i18n/i18n';

const LostDogDetailsHeader = (props) => {

    return (
        <>
            <Card>
                <CameraImagePicker
                    selectedImage={props.selectedImage}
                    onImageSelected={props.onImageSelected} />
                {!props.selectedImage.isValid && (
                    <Text
                        testID='details-screen-header-image-error'
                        style={styles.errorLabel}>
                        {i18n.t(props.selectedImage.errorKey)}
                    </Text>
                )}
            </Card>
            {props.selectedImage.isPresent && (
                <Card>
                    <Button
                        buttonStyle={styles.clearImageButtonStyle}
                        titleStyle={{color: colors.white}}
                        title='Clear image'
                        onPress={props.onImageCleared} />
                </Card>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        flex: 1,
        resizeMode: 'cover',
        height: 400
    },
    errorLabel: {
        fontSize: 12,
        color: colors.errorRed
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