import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {connect} from "react-redux";
import { onHomepageMounted } from '../../redux/actions/homepage/action-creators/action.creators';

class HomePage extends Component {

    componentDidMount() {
        this.props.onHomepageMounted();
    }

    render() {
        return (
            <View>
                <Text>{this.props.homepageLoading ? 'Loading': 'Loaded2'}</Text>
                <View>
                    {this.props.homepageData.map((data) => {
                        return (
                            <View>
                                <Text>{data.id}</Text>
                                <Text>{data.dogName}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        homepageInitialized: state.homepage.homepageInitialized,
        homepageLoading: state.homepage.homepageLoading,
        homepageData: state.homepage.homepageData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onHomepageMounted: () => dispatch(onHomepageMounted())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);