import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {connect} from "react-redux";
import LostMyDogNavigator from './navigation/LostMyDogNavigator';
import { onApplicationMounted } from '../redux/actions/application/action-creators/action.creators';

class ApplicationWrapper extends Component {

    componentDidMount() {
        this.props.onApplicationMounted();
    }

    render() {
        let content = null;
        if (this.props.applicationInitialized) {
            console.log(this.props.permissions)
            content = <LostMyDogNavigator />;
        } else {
            content = <Text>Init app</Text>;
        }
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                {content}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        applicationInitialized: state.application.applicationInitialized,
        loginRequired: state.application.loginRequired,
        user: state.application.user,
        permissions: state.application.permissions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onApplicationMounted: () => dispatch(onApplicationMounted())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationWrapper);