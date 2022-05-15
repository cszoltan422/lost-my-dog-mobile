import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../../colors';

interface CardStyle {
    height: number | string;
    backgroundColor: string;
}

interface IProps {
    styles?: CardStyle;
    testID?: string;
    children: JSX.Element | JSX.Element[]
}

const Card = (props: IProps) => {
    return (
        <View style={{...styles.card, ...props.styles}} testID={props.testID}>
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

export default Card;