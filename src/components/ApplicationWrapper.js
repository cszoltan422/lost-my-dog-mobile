import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import SplashImage from './splash/SplashImage';
import LostMyDogNavigator from './navigation/LostMyDogNavigator';
import LocationPermissionInitScreen from './permissions/LocationPermissionInitScreen';
import {
    onApplicationMounted,
    onCheckLocationPermission
} from '../redux/actions/application/action-creators/action.creators';

class ApplicationWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elapsedTime: 0
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                elapsedTime: 2000
            });
        }, 2100);
        this.props.onApplicationMounted();
    }

    render() {
        if (!this.props.applicationInitialized || this.state.elapsedTime < 2000) {
            return (
                <SplashImage />
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

const mapDispatchToProps = (dispatch) => {
    return {
        onApplicationMounted: () => dispatch(onApplicationMounted()),
        onCheckLocationPermission: () => dispatch(onCheckLocationPermission())
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

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationWrapper);