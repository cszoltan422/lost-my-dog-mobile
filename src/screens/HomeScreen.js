import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {connect} from "react-redux";
import LostDogSummaryListItem from '../components/home-page/LostDogSummaryListItem';
import { onHomepageMounted } from '../redux/actions/homepage/action-creators/action.creators';

class HomeScreen extends Component {

    componentDidMount() {
        this.props.onHomepageMounted();
    }

    render() {
        return (
            <View>
                <FlatList
                    keyExtractor={(data) => data.id}
                    data={this.props.homepageData}
                    renderItem={(data) => {
                        return (
                            <LostDogSummaryListItem dog={data.item}/>
                        )
                    }}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);