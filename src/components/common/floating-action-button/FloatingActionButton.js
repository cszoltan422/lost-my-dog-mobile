import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {SpeedDial} from 'react-native-elements';

const FloatingActionButton = (props) => {

    const [open, setOpen] = useState(false);

    return (
        <SpeedDial
            isOpen={open}
            color={props.color}
            icon={props.icon}
            openIcon={props.openIcon}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}>
            {props.actions.map((action, index) => {
                return (
                    <SpeedDial.Action
                        key={index}
                        color={action.color}
                        icon={action.icon}
                        title={action.title}
                        onPress={() => {
                            setOpen(false);
                            action.pressHandler();
                        }} />
                );
            })}
        </SpeedDial>
    )
};

FloatingActionButton.propTypes = {
    color: PropTypes.string.isRequired,
    icon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    }).isRequired,
    openIcon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    }).isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        icon: PropTypes.shape({
            name: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired
        }).isRequired,
        pressHandler: PropTypes.func.isRequired
    })).isRequired
}

export default FloatingActionButton;