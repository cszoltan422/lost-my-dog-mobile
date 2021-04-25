import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
    return (
        <View style={styles.card}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 16,
        backgroundColor: 'white',
        marginBottom: 8,
        padding: 8,
        height: 110
    }
});

export default Card;