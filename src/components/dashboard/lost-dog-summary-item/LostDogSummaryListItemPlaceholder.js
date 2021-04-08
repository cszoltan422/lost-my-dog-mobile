import React, { Component } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../../colors';

class LostDogSummaryListItemPlaceholder extends Component {

    render() {
        return (
            <SkeletonPlaceholder highlightColor={colors.white} backgroundColor={colors.placeholderGrey} >
                <SkeletonPlaceholder.Item height={110} marginBottom={8}  borderRadius={16} />
                <SkeletonPlaceholder.Item height={110} marginBottom={8}  borderRadius={16} />
            </SkeletonPlaceholder>
        );
    }
}

export default LostDogSummaryListItemPlaceholder;