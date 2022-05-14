import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../../../colors';

interface IProps {
    text: string;
    testID?: string;
}

const Chip = (props: IProps) => {
    return (
        <View style={styles.chip} testID={props.testID}>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </View>
    );
};

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
        color: colors.white,
        fontWeight: 'bold'
    }
});

export default Chip;