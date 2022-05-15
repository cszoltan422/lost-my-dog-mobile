import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Card from '../../common/card/card';
import CameraImagePicker from '../../common/image-picker/camera-image-picker';
import colors from '../../../colors';
import i18n from '../../../i18n/i18n';
import {SubmitFormSelectedImage} from '../../../redux/reducers/submit-form/submit-form-reducer';

interface IProps {
    selectedImage: SubmitFormSelectedImage;
    onImageSelected: (uri: string) => void;
    onImageCleared: () => void;
}

const LostDogDetailsHeader = (props: IProps) => {

    return (
        <>
            <Card>
                <>
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
                </>
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

export default LostDogDetailsHeader;