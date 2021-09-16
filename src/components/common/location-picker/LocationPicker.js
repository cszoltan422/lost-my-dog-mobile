import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {Icon} from 'react-native-elements';
import {MAPS_DEFAULT_LATLON_DELTA} from '../../../application.constants';
import i18n from '../../../i18n/i18n';
import {LOCATION_PICKER_CURRENT_COORDINATES, LOCATION_PICKER_INFO_DESCRIPTION} from '../../../i18n/i18n.keys';
import colors from '../../../colors';

const LocationPicker = (props) => {

    const [coordinate, setCoordinate] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: MAPS_DEFAULT_LATLON_DELTA.latitudeDelta,
        longitudeDelta: MAPS_DEFAULT_LATLON_DELTA.longitudeDelta,
    });

    useEffect(() => {
        console.log(props)
        setCoordinate({
            latitude: props.latitude,
            longitude: props.longitude,
            latitudeDelta: MAPS_DEFAULT_LATLON_DELTA.latitudeDelta,
            longitudeDelta: MAPS_DEFAULT_LATLON_DELTA.longitudeDelta,
        });
    }, []);

    const handleOnPress = (event) => {
        const { coordinate } = event.nativeEvent;
        props.onSubmitFormLocationValueChanged({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        });
    };

    const handleOnRegionChangeComplete = (region) => {
        setCoordinate({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta
        });
    }

    const handleOnCoordinateTextPressed = () => {
        setCoordinate((currentState) => {
            return {
                latitude: props.latitude,
                longitude: props.longitude,
                latitudeDelta: currentState.latitudeDelta,
                longitudeDelta: currentState.longitudeDelta
            };
        });
    }

    return (
        <View>
            <View>
                <View style={styles.mapHeaderContainer}>
                    <Icon
                        type='material'
                        name='info'
                        color={props.iconColor} />
                    <Text style={styles.mapInfoTextStyle}>
                        {i18n.t(LOCATION_PICKER_INFO_DESCRIPTION)}
                    </Text>
                </View>
                <View style={styles.currentCoordinatesContainer}>
                    <Icon
                        type='material'
                        name='room'
                        color={props.iconColor} />
                    <Text style={styles.mapInfoTextStyle}>
                        {i18n.t(LOCATION_PICKER_CURRENT_COORDINATES)}
                    </Text>
                    <Text
                        style={styles.currentCoordinatesTextStyle}
                        onPress={handleOnCoordinateTextPressed}>
                        {props.longitude.toFixed(5)}, {props.latitude.toFixed(5)}
                    </Text>
                </View>
            </View>
            <MapView
                testID='map-view-container'
                style={styles.mapContainer}
                region={coordinate}
                onPress={handleOnPress}
                onRegionChangeComplete={handleOnRegionChangeComplete}>
                <Marker
                    testID='map-view-marker'
                    coordinate={{
                        longitude: props.longitude,
                        latitude: props.latitude
                    }}
                    title={`${props.longitude.toFixed(5)}, ${props.latitude.toFixed(5)}`} >
                    <Icon
                        type={props.iconType}
                        name={props.iconName}
                        size={props.iconSize}
                        color={props.iconColor} />
                </Marker>
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: Dimensions.get('window').height / 2,
        marginTop: 8
    },
    mapHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    mapInfoTextStyle: {
        marginStart: 4,
        color: colors.grey
    },
    currentCoordinatesContainer: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    currentCoordinatesTextStyle: {
        color: colors.accentColor,
        fontWeight: 'bold'
    }
});

LocationPicker.propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    iconType: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
    iconSize: PropTypes.number.isRequired,
    onSubmitFormLocationValueChanged: PropTypes.func.isRequired
}

export default LocationPicker;