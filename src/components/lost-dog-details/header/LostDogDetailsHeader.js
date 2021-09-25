import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Card from '../../common/card/Card';
import CameraImagePicker from '../../common/image-picker/CameraImagePicker';
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
        </>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        flex: 1,
        resizeMode: 'cover',
        height: 400
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