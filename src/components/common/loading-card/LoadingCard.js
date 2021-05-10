import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../../colors';

const LoadingCard = () => {
    return (
        <SkeletonPlaceholder highlightColor={colors.white} backgroundColor={colors.placeholderGrey} >
            <SkeletonPlaceholder.Item height={110} marginBottom={8} borderRadius={16} />
        </SkeletonPlaceholder>
    );
};

export default LoadingCard;