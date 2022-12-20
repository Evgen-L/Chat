import React, {FC} from 'react';
import {MessageData} from "../../../types/messageData";
import styles from '../Messages.module.css'

type MessageItemProps = {
    message: MessageData,
}
function dateToString(date: Date): string {
    return `${date.toLocaleTimeString()} ${date.toDateString()}`;
}

const MessageCompanionItem : FC<MessageItemProps> = (message) => {
    return (
    <div>
        <div className={styles.messageCompanion}>
            <div className={styles.nameText}>{message.message.userName}</div>
            <p className={styles.messageContent}>{message.message.text}</p>
            <div className={styles.messageTimestampLeft}>{dateToString(message.message.time)}</div>
        </div>
    </div>
    );
};

export default MessageCompanionItem;