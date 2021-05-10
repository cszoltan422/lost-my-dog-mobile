import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import i18n from '../../../../i18n/i18n';
import { DASHBOARD_LIST_END_REACHED } from '../../../../i18n/i18n.keys';
import colors from '../../../../colors';

const DashboardListEndIndicator = () => {

    return (
        <View style={styles.container}>
            <View style={styles.separator} />
            <Text style={styles.text}>{i18n.t(DASHBOARD_LIST_END_REACHED)}</Text>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    separator: {
        borderWidth: 0.5,
        width: '100%',
        borderColor: colors.grey
    },
    text: {
        color: colors.grey
    }
});

export default DashboardListEndIndicator;