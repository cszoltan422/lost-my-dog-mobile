import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import LostMyDogNavigator from './navigation/LostMyDogNavigator';
import { onApplicationMounted } from '../redux/actions/application/action-creators/action.creators';

class ApplicationWrapper extends Component {

    componentDidMount() {
        this.props.onApplicationMounted();
    }

    render() {
        let content;
        if (this.props.applicationInitialized) {
            content = <LostMyDogNavigator />;
        } else {
            content = (<ImageBackground
                source={require('../../assets/splash-screen.jpg')}
                style={styles.imageBackground} />);
        }
        return (
            <View style={styles.content}>
                {content}
            </View>
        );
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
        applicationInitialized: state.application.applicationInitialized
    };
};

ApplicationWrapper.propTypes = {
    applicationInitialized: PropTypes.bool.isRequired,
    onApplicationMounted: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        onApplicationMounted: () => dispatch(onApplicationMounted())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationWrapper);