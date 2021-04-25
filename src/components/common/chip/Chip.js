import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../../../colors';

const Chip = (props) => {
    return (
        <View style={styles.chip}>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    chip: {
        padding: 4,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: colors.accentColor,
        backgroundColor: colors.accentColor,
        marginTop: -16
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold'
    }
});

export default Chip;