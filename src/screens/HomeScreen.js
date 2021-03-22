import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {connect} from "react-redux";
import LostDogSummaryListItem from '../components/home-page/LostDogSummaryListItem';
import { onHomepageMounted } from '../redux/actions/homepage/action-creators/action.creators';
import i18n from '../i18n/i18n';
import {DASHBOARD_TITLE} from "../i18n/i18n.keys";

class HomeScreen extends Component {

    componentDidMount() {
        this.props.onHomepageMounted();
    }

    static navigationOptions = () => {
        return {
          title: i18n.t(DASHBOARD_TITLE)
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
                    keyExtractor={item => item.id.toString()}
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