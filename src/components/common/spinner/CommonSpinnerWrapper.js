import { Spinner } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner as BaseSpinner } from 'native-base';

class CommonSpinnerWrapper extends Component {
    render () {
        return (
            <View>
                {this.props.loading ? <BaseSpinner color='blue' /> : this.props.children}
            </View>
        );
    }
}

export default CommonSpinnerWrapper;