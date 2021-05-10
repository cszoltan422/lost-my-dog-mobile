import React from 'react';
import PropTypes from 'prop-types';
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
        color: colors.white,
        fontWeight: 'bold'
    }
});

Chip.propTypes = {
    text: PropTypes.string.isRequired
}

export default Chip;