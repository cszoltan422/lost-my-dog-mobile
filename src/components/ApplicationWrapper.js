import React, { Component } from 'react';
import { View } from 'react-native';
import {connect} from "react-redux";
import HomePage from './home/HomePage';
import { onApplicationMounted } from '../redux/actions/application/action-creators/action.creators'

class ApplicationWrapper extends Component {

    componentDidMount() {
        this.props.onApplicationMounted();
    }

    render() {
        return (
            <View>
                <HomePage />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        applicationInitialized: state.application.applicationInitialized,
        loginRequired: state.application.loginRequired,
        user: state.application.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onApplicationMounted: () => dispatch(onApplicationMounted())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationWrapper);