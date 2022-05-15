import React, { useState, useEffect } from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import MapView, {MapEvent, Marker, Region} from 'react-native-maps';
import {MAPS_DEFAULT_LATLON_DELTA} from '../../../application.constants';
import i18n from '../../../i18n/i18n';
import colors from '../../../colors';
import {Location} from '../../../service/search-lost-dogs-service';
import {Icon} from '@rneui/base';

interface IProps {
    longitude: number;
    latitude: number;
    iconType: string;
    iconName: string;
    iconColor: string;
    iconSize: number;
    markerTitle?: string;
    onLocationValueChanged: (location: Location) => void;
}

const LocationPicker = (props: IProps) => {

    const [coordinate, setCoordinate] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: MAPS_DEFAULT_LATLON_DELTA.latitudeDelta,
        longitudeDelta: MAPS_DEFAULT_LATLON_DELTA.longitudeDelta,
    });

    useEffect(() => {
        setCoordinate({
            latitude: props.latitude,
            longitude: props.longitude,
            latitudeDelta: MAPS_DEFAULT_LATLON_DELTA.latitudeDelta,
            longitudeDelta: MAPS_DEFAULT_LATLON_DELTA.longitudeDelta,
        });
    }, []);

    const handleOnPress = (event: MapEvent) => {
        const { coordinate } = event.nativeEvent;
        props.onLocationValueChanged({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        });
    };

    const handleOnRegionChangeComplete = (region: Region) => {
        setCoordinate({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta
        });
    };

    const handleOnCoordinateTextPressed = () => {
        setCoordinate((currentState) => {
            return {
                latitude: props.latitude,
                longitude: props.longitude,
                latitudeDelta: currentState.latitudeDelta,
                longitudeDelta: currentState.longitudeDelta
            };
        });
    };

    return (
        <View testID='location-picket-container'>
            <View style={styles.mapHeaderContainer}>
                <Icon
                    type='material'
                    name='info'
                    color={props.iconColor} />
                <Text
                    testID='location-picker-map-info-text'
                    style={styles.mapInfoTextStyle}>
                    {i18n.t('locationPicker.usageInfo')}
                </Text>
            </View>
            <View
                style={styles.currentCoordinatesContainer}>
                <Icon
                    type='material'
                    name='room'
                    color={props.iconColor} />
                <Text
                    testID='location-picker-current-coordinates-text'
                    style={styles.mapInfoTextStyle}>
                    {i18n.t('locationPicker.currentCoordinates')}
                </Text>
                <Text
                    style={styles.currentCoordinatesTextStyle}
                    onPress={handleOnCoordinateTextPressed}>
                    {props.longitude.toFixed(5)}, {props.latitude.toFixed(5)}
                </Text>
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
        alignItems: 'center',
        paddingStart: 8,
        paddingEnd: 8
    },
    mapInfoTextStyle: {
        marginStart: 4,
        color: colors.grey
    },
    currentCoordinatesContainer: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingStart: 8,
        paddingEnd: 8
    },
    currentCoordinatesTextStyle: {
        color: colors.accentColor,
        fontWeight: 'bold'
    }
});

export default LocationPicker;