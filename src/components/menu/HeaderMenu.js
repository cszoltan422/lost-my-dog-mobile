import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Menu, {MenuItem} from 'react-native-material-menu';
import {Icon} from 'react-native-elements';
import {LOGIN_NAVIGATION_SCREEN_NAME} from '../../application.constants';
import i18n from '../../i18n/i18n';
import colors from '../../colors';
import {LOGIN_LOGIN_TEXT} from '../../i18n/i18n.keys';

class HeaderMenu extends Component {

    menu = null;

    setMenuRef = ref => {
        this.menu = ref;
    };

    hideMenu = () => {
        this.menu.hide();
    };

    navigateToScreen = (screenName) => {
        this.hideMenu();
        this.props.navigation.navigate({
            routeName: screenName
        });
    }


    showMenu = () => {
        this.menu.show();
    };

    render() {
        return (
            <Menu
                ref={this.setMenuRef}
                button={
                    <Icon
                        type='material'
                        name='more-vert'
                        color={colors.white}
                        onPress={this.showMenu} />
            }>
                {!this.props.user.isLoggedIn ?
                    <MenuItem onPress={() => this.navigateToScreen(LOGIN_NAVIGATION_SCREEN_NAME)}>
                        {i18n.t(LOGIN_LOGIN_TEXT)}
                    </MenuItem>
                    : null}
            </Menu>
        );
    }
}

HeaderMenu.propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.application.user
    };
};

export default connect(mapStateToProps, null)(HeaderMenu);