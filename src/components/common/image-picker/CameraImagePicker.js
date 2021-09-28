import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, StyleSheet, Dimensions, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../../colors';

const CameraImagePicker = (props) => {

    const [camera, setCamera] = useState({
        isDenied: false
    });

    const [imagePicker, setImagePicker] = useState({
        isDenied: false
    });

    const handleOnCameraIconPressed = async () => {
        let requestResult = await ImagePicker.requestCameraPermissionsAsync();
        if (requestResult.status === 'granted') {
            await launchCameraForResult();
        } else {
            setCamera({
                isDenied: true
            });
        }
    };

    const handleImagePickerIconPressed = async () => {
        let requestResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
        <View style={styles.container}>
            {props.selectedImage.isPresent ?
                <>
                    <Image
                        style={styles.imageStyle}
                        source={{uri: props.selectedImage.uri,}} />
                </>
            :
                <>
                    <TouchableOpacity
                        style={styles.columnContainer}
                        onPress={!imagePicker.isDenied ? handleImagePickerIconPressed : null}>
                        <View>
                            <Icon
                                type='material'
                                name={`${!imagePicker.isDenied ? 'image' : 'broken-image'}`}
                                color={!imagePicker.isDenied ? colors.accentColor : colors.grey} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.columnContainer}
                        onPress={!camera.isDenied ? handleOnCameraIconPressed : null}>
                        <View>
                            <Icon
                                type='material'
                                name={`${!camera.isDenied ? 'photo-camera' : 'no-photography'}`}
                                color={!camera.isDenied ? colors.accentColor : colors.grey} />
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

CameraImagePicker.propTypes = {
    selectedImage: PropTypes.shape({
        uri: PropTypes.string.isRequired,
        isPresent: PropTypes.bool.isRequired,
        isValid: PropTypes.bool.isRequired,
        errorKey: PropTypes.string.isRequired
    }).isRequired,
    onImageSelected: PropTypes.func.isRequired
};

export default CameraImagePicker;