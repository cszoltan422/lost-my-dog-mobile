import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import Card from '../../common/card/card';
import ENV from '../../../environmnent.config';
import colors from '../../../colors';
import {LostDog} from '../../../service/search-lost-dogs-service';

interface IProps {
    dog: LostDog;
}

const LostDogDetailsHeaderReadonly = (props: IProps) => {

    return (
        <>
            <Card>
                <Image
                    testID='details-screen-image'
                    style={styles.imageStyle}
                    source={{uri: `${ENV.API_URL}/api/image/${props.dog.avatarFilename}`,}} />
            </Card>
            <Card styles={styles.descriptionCardStyle}>
                <Text
                    testID='details-screen-description-text'
                    style={styles.descriptionTextStyle}>
                    {props.dog.description}
                </Text>
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
    }
});

export default LostDogDetailsHeaderReadonly;