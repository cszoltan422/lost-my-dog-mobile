import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {MAPS_DEFAULT_LATLON_DELTA} from '../../../application.constants';
import {Icon} from '@rneui/base';

interface IProps {
    longitude: number;
    latitude: number;
    markerTitle: string;
    iconType: string;
    iconName: string;
    iconColor: string;
    iconSize: number;
}

const MapsView = (props: IProps) => {

    const region = {
        latitude: props.latitude,
        longitude: props.longitude,
        latitudeDelta: MAPS_DEFAULT_LATLON_DELTA.latitudeDelta,
        longitudeDelta: MAPS_DEFAULT_LATLON_DELTA.longitudeDelta,
    };

    return (
        <MapView
            testID='map-view-container'
            style={styles.mapContainer}
            region={region}>
            <Marker
                testID='map-view-marker'
                coordinate={region}
                title={props.markerTitle} >
                <Icon
                    type={props.iconType}
                    name={props.iconName}
                    size={props.iconSize}
                    color={props.iconColor} />
            </Marker>
        </MapView>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: Dimensions.get('window').height / 2
    }
});

MapsView.propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    markerTitle: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
    iconSize: PropTypes.number.isRequired,
};

export default MapsView;