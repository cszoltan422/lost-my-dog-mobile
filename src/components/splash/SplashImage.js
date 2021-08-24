import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const SplashImage = () => {

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/splash.gif')}
                style={styles.gif} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    gif: {
        width: 250,
        height: 250
    }
});

export default SplashImage;