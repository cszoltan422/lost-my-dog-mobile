import React from 'react';
import {Image, View} from 'react-native';

const SplashImage = (props) => {

    return (
        <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'}}>
            <Image
                source={require('../../../assets/splash.gif')}
                style={{ width: 250, height: 250 }} />
        </View>
    );
};

export default SplashImage;