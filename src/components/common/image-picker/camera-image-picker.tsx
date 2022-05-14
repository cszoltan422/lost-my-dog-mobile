import React, { useState } from 'react';
import {TouchableOpacity, View, StyleSheet, Dimensions, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../../colors';

interface ImagePickerSelectedImage {
    uri: string;
    isPresent: boolean;
    isValid: boolean;
    errorKey: string;
}

interface IProps {
    selectedImage: ImagePickerSelectedImage;
    onImageSelected: (uri: string) => void;
}

const CameraImagePicker = (props: IProps) => {

    const [camera, setCamera] = useState({
        isDenied: false
    });

    const [imagePicker, setImagePicker] = useState({
        isDenied: false
    });

    const handleOnCameraIconPressed = async () => {
        const requestResult = await ImagePicker.requestCameraPermissionsAsync();
        if (requestResult.status === 'granted') {
            await launchCameraForResult();
        } else {
            setCamera({
                isDenied: true
            });
        }
    };

    const handleImagePickerIconPressed = async () => {
        const requestResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (requestResult.status === 'granted') {
            await launchImagePickerForResult();
        } else {
            setImagePicker({
                isDenied: true
            });
        }
    };

    const launchCameraForResult = async () => {
        const cameraResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        if (!cameraResult.cancelled) {
            props.onImageSelected(cameraResult.uri);
        }
    };

    const launchImagePickerForResult = async () => {
        const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        if (!imagePickerResult.cancelled) {
            props.onImageSelected(imagePickerResult.uri);
        }

    };

    return (
        <View
            testID='image-picker-container'
            style={styles.container}>
            {props.selectedImage.isPresent ?
                <>
                    <Image
                        testID='image-picker-selected-image'
                        style={styles.imageStyle}
                        source={{uri: props.selectedImage.uri,}} />
                </>
            :
                <>
                    <TouchableOpacity
                        testID='image-picker-image-media-library-icon'
                        style={styles.columnContainer}
                        onPress={!imagePicker.isDenied ? handleImagePickerIconPressed : undefined}>
                        <View>
                            <Icon
                                type='material'
                                name={`${!imagePicker.isDenied ? 'image' : 'broken-image'}`}
                                color={!imagePicker.isDenied ? colors.accentColor : colors.grey}
                                tvParallaxProperties={undefined} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID='image-picker-image-camera-icon'
                        style={styles.columnContainer}
                        onPress={!camera.isDenied ? handleOnCameraIconPressed : undefined}>
                        <View>
                            <Icon
                                type='material'
                                name={`${!camera.isDenied ? 'photo-camera' : 'no-photography'}`}
                                color={!camera.isDenied ? colors.accentColor : colors.grey}
                                tvParallaxProperties={undefined} />
                        </View>
                    </TouchableOpacity>
                </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
   container: {
       padding: 8,
       flex: 1,
       flexDirection: 'row'
   },
    columnContainer: {
       flex: 1,
        height: Dimensions.get('window').height / 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGrey
    },
    imageStyle: {
        flex: 1,
        resizeMode: 'cover',
        height: 400
    },
});

export default CameraImagePicker;