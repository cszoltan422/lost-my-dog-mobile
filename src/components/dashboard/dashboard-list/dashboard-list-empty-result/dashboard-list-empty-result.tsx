import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import i18n from '../../../../i18n/i18n';
import colors from '../../../../colors';
import {Icon} from '@rneui/base';

const DashboardListEmptyResult = () => {

    return (
        <View
            testID='dashboard-list-empty-result-container'
            style={styles.container}>
            <Icon
                type='font-awesome'
                name='paw'
                size={72}
                color={colors.accentColor} />
            <Text style={styles.textStyle}>
                {i18n.t('dashboard.emptyResult')}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 24,
        padding: 8,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 24
    }
});

export default DashboardListEmptyResult;