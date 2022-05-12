import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import i18n from '../../../../i18n/i18n';
import colors from '../../../../colors';

const DashboardListEndIndicator = () => {

    return (
        <View
            testID='dashboard-list-end-reached-indicator-container'
            style={styles.container}>
            <View style={styles.separator} />
            <Text
                testID='dashboard-list-end-reached-indicator-text'
                style={styles.text}>{i18n.t('dashboard.endReached')}</Text>
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