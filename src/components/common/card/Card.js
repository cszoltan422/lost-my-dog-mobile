import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import colors from '../../../colors';

const Card = (props) => {
    return (
        <View style={styles.card}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: colors.black,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 16,
        backgroundColor: colors.white,
        marginBottom: 8,
        padding: 8,
        height: 110
    }
});

Card.propTypes = {
    children: PropTypes.object.isRequired
}

export default Card;