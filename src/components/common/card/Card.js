import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import colors from '../../../colors';

const Card = (props) => {
    return (
        <View style={{...styles.card, ...props.styles}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: colors.black,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 16,
        backgroundColor: colors.white,
        marginBottom: 8,
        padding: 8
    }
});

Card.propTypes = {
    children: PropTypes.object.isRequired,
    styles: PropTypes.object
};

export default Card;