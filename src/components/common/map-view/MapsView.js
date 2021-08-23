import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {Icon} from 'react-native-elements';

const MapsView = (props) => {

    let region = {
        latitude: props.latitude,
        longitude: props.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
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
    )
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
}

export default MapsView;