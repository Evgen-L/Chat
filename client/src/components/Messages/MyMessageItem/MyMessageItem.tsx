import React, {FC} from 'react';
import {Dropdown, Menu} from "antd";
import {MessageData} from "../../../types/messageData";
import styles from '../Messages.module.css'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useAction, useAtom} from "@reatom/react";
import {chatActions, chatAtoms} from "../../../chat/viewModel/chat";
import {EnterBlockMode} from "../../../types/enterBlockMode";

type MessageItemProps = {
    message: MessageData,
}

const MyMessageItem : FC<MessageItemProps> = (message) => {

    const handleDeleteMessage = useAction(chatActions.deleteMessage)
    const handleSetChatMode = useAction(chatActions.setEnterBlockMode)
    const handleSetEditText = useAction(chatActions.setEditMessageText)
    const handleSetEditId = useAction(chatActions.setEditMessageId)
    const chatMode = useAtom(chatAtoms.enterBlockModeAtom)

    const onButtonEditClicked = () => {
        handleSetChatMode(EnterBlockMode.EDIT)
        handleSetEditText(message.message.text)
        handleSetEditId(message.message.id)
    }

    const content = () =>
    {
        return (
            <div className={styles.myMessage}>
                <p className={styles.messageContent}>{message.message.text}</p>
                <div className={styles.messageTimestampRight}>{message.message.time.toDateString()}</div>
            </div>
        )
    }

    const menu = (
        <Menu style={{ width: 45 }}>
            <Menu.Item>
                <EditOutlined onClick={ onButtonEditClicked } />
            </Menu.Item>
            <Menu.Item>
                <DeleteOutlined onClick={ e => handleDeleteMessage(message.message.id) }/>
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            {
                chatMode === EnterBlockMode.WRITE
                    ?
                    <Dropdown overlay={menu} trigger={['click']} placement="topCenter" >
                        {content()}
                    </Dropdown>
                    :
                    <div>
                        {content()}
                    </div>
            }
        </div>
    );
};

export default MyMessageItem;