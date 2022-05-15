import React, { useState } from 'react';
import {SpeedDial} from 'react-native-elements';
import {IconNode} from 'react-native-elements/dist/icons/Icon';

interface FloatingActionButtonAction {
    color: string;
    icon: IconNode;
    title: string;
    pressHandler: () => void;
}

interface IProps {
    color: string;
    icon: IconNode;
    openIcon: IconNode;
    actions: FloatingActionButtonAction[];
}

const FloatingActionButton = (props: IProps) => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <SpeedDial
            testID='floating-action-button'
            isOpen={open}
            color={props.color}
            icon={props.icon}
            openIcon={props.openIcon}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}>
            {props.actions.map((action, index) => {
                return (
                    <SpeedDial.Action
                        testID='floating-action-button-new-submission-option'
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
    );
};

export default FloatingActionButton;