import React, { Component } from 'react';
import {  Text } from 'react-native';

class LostDogSummaryListItem extends Component {

    render() {
        return (
            <Text>{this.props.dog.dogName}</Text>
        );
    }
}

export default LostDogSummaryListItem;