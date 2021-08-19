import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import LostMyDogNavigator from './navigation/LostMyDogNavigator';
import LocationPermissionInitScreen from './permissions/LocationPermissionInitScreen';
import {
    onApplicationMounted,
    onCheckLocationPermission
} from '../redux/actions/application/action-creators/action.creators';

class ApplicationWrapper extends Component {

    componentDidMount() {
        this.props.onApplicationMounted();
    }

    render() {
        if (!this.props.applicationInitialized) {
            return (
                <ImageBackground
                    source={require('../../assets/splash-screen.jpg')}
                    style={styles.imageBackground} />
            );
        } else if (!this.props.locationPermission.granted) {
            return (
                <LocationPermissionInitScreen
                    locationPermission={this.props.locationPermission}
                    onCheckLocationPermission={this.props.onCheckLocationPermission} />
            )
        } else {
            return (
                <View style={styles.content}>
                    <LostMyDogNavigator />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        applicationInitialized: state.application.applicationInitialized,
        locationPermission: state.application.permissions.location,
    };
};

ApplicationWrapper.propTypes = {
    applicationInitialized: PropTypes.bool.isRequired,
    locationPermission: PropTypes.shape({
        granted: PropTypes.bool.isRequired,
        canAskAgain: PropTypes.bool.isRequired
    }).isRequired,
    onApplicationMounted: PropTypes.func.isRequired,
    onCheckLocationPermission: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        onApplicationMounted: () => dispatch(onApplicationMounted()),
        onCheckLocationPermission: () => dispatch(onCheckLocationPermission())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationWrapper);