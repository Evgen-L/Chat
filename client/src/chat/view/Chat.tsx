import React, {useEffect, useMemo} from 'react';
import styles from './Chat.module.css'
import {List} from "antd";
import { SendOutlined, CheckOutlined, StopOutlined } from "@ant-design/icons"
import {useAction, useAtom} from "@reatom/react";
import {authAtoms} from "../../auth/viewModel/auth";
import {chatActions, chatAtoms} from "../viewModel/chat";
import MessageCompanionItem from "../../components/Messages/MessageCompanionItem/MessageCompanionItem";
import {Redirect} from "react-router-dom";
import {AUTH_ROUTE} from "../../utils/consts";
import TextArea from "antd/es/input/TextArea";
import MyMessageItem from "../../components/Messages/MyMessageItem/MyMessageItem";
import {EnterBlockMode} from "../../types/enterBlockMode";
import NavBar from "../../components/NavBar/NavBar";
import {messagesActions, messagesAtom} from "../message/viewModel/message";
import {MessageData} from "../../types/messageData";
import {HttpTransportType, HubConnectionBuilder} from "@microsoft/signalr";
import {urls} from "../../api/urls";

const Chat = () => {
    const isUserAuth = useAtom(authAtoms.isAuthUserAtom)
    const userName = useAtom(authAtoms.userNameAtom)
    const textMessage = useAtom(chatAtoms.messageTextAtom)
    const chatMode = useAtom(chatAtoms.enterBlockModeAtom)
    const messages = useAtom(messagesAtom)
    const editText = useAtom(chatAtoms.editMessageTextAtom)
    const editId = useAtom(chatAtoms.editMessageIdAtom)
    const editMessage = useAtom(chatAtoms.editingMessageAtom)
    const isAuth = useAtom(authAtoms.isAuthUserAtom)
    const connection = useAtom(chatAtoms.connectionAtom)

    const handleSetText = useAction(chatActions.setMessageText)
    const handleSendMessage = useAction(chatActions.sendMessage)
    const handleSetChatMode = useAction(chatActions.setEnterBlockMode)
    const handleSetEditText = useAction(chatActions.setEditMessageText)
    const handleEditMessage = useAction(chatActions.editMessage)
    const handleSetEditMessage = useAction(chatActions.setEditingMessage)
    const handleSetEditId = useAction(chatActions.setEditMessageId)
    const handleLoadMessages = useAction(chatActions.loadMessages)
    const handleSetConnection = useAction(chatActions.setConnection)
    const handleDeleteMessage = useAction(messagesActions.removeMessage)
    const handleUpdateMessage = useAction(messagesActions.updateMessage)

    useEffect(() => {
        handleLoadMessages()
    }, [isAuth, handleLoadMessages]);

    const messagesList: MessageData[] = useMemo(() => Object.values(messages).reverse(), [messages]);

    const onButtonSendClicked = () => {
        console.log("test front-tests 1")
        if (textMessage) {
            const currTime = new Date()
            handleSendMessage({text: textMessage, userName: userName, time: currTime})
            handleSetText("")
        }
    }

    const onButtonAcceptEditingClicked = () => {
        handleSetChatMode(EnterBlockMode.WRITE)
        handleEditMessage({oldMessage: editMessage, newText: editText})
        handleSetEditText("")
        handleSetEditId("")
    }

    const onButtonUndoEditingClicked = () => {
        handleSetChatMode(EnterBlockMode.WRITE)
        handleSetEditText("")
    }

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(urls.HUB_URL, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build();

        handleSetConnection(newConnection);
    }, [handleSetConnection]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.on('Receive', (id, message, userName, time) => {
                        handleUpdateMessage({
                            id,
                            userName,
                            text: message,
                            time: new Date(time),
                        })
                    });

                    connection.on('Delete', (id) => {
                        handleDeleteMessage([id])
                    });

                    connection.on('Update', (message) => {
                        handleUpdateMessage({
                            id: message.id,
                            userName: message.userName,
                            text: message.text,
                            time: message.time
                        })
                    });
                })
                .catch(e => {});
        }
    }, [connection, messagesList, handleDeleteMessage, handleUpdateMessage]);

    if (!isUserAuth) {
        return <Redirect to={AUTH_ROUTE} />
    }

    return (
        <div>
            <NavBar/>
            <div className={styles.content}>
                <div className={styles.chat}>
                    <List
                        className={styles.list}
                        split={false}
                        itemLayout="horizontal"
                        dataSource={Object.values(messages)}
                        renderItem={(message) => {
                            if (message.userName === userName)
                                return <MyMessageItem message={message}/>
                            else
                                return <MessageCompanionItem message={message}/>
                        }}
                    />
                    <div className={styles.messageEnterBlock}>
                        <TextArea
                            value={chatMode === EnterBlockMode.WRITE ? textMessage : editText}
                            onChange={e =>
                            {
                                if (chatMode === EnterBlockMode.WRITE)
                                    handleSetText(e.target.value)
                                else
                                {
                                    handleSetEditText(e.target.value)
                                    handleSetEditMessage({
                                        id: editId,
                                        userName: userName,
                                        text: e.target.value,
                                        time: new Date()})
                                }
                            }}
                            placeholder="Type here..."
                        />
                        {
                            chatMode === EnterBlockMode.WRITE
                                ? <SendOutlined className={styles.btnEnterBlock} onClick={onButtonSendClicked}/>
                                :
                                <div>
                                    <CheckOutlined className={styles.btnEnterBlock} onClick={onButtonAcceptEditingClicked}/>
                                    <StopOutlined className={styles.btnEnterBlock} onClick={onButtonUndoEditingClicked}/>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;