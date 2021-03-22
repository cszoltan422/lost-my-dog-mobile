import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {connect} from "react-redux";
import LostDogSummaryListItem from '../components/home-page/LostDogSummaryListItem';
import { onHomepageMounted } from '../redux/actions/homepage/action-creators/action.creators';

class HomeScreen extends Component {

    componentDidMount() {
        this.props.onHomepageMounted();
    }

    static navigationOptions = () => {
        return {
          title: 'Dashboard'
        };
      };

    render() {
        return (
            <View style={{height: '100%', padding: 8}}>
                <FlatList
                    data={this.props.homepageData}
                    renderItem={(item) => {
                        return (
                            <LostDogSummaryListItem dog={item.item}/>
                        );
                    }}
                    keyExtractor={item => item.id}
                />
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