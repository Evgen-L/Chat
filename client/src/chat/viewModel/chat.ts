import {MessageData} from "../../types/messageData";
import {declareAtomWithSetter} from "../../core/reatom/declareAtomWithSetter";
import {EnterBlockMode} from "../../types/enterBlockMode";
import {declareAsyncAction} from "../../core/reatom/declareAsyncAction";
import {authActions} from "../../auth/viewModel/auth";
import { HubConnection } from "@microsoft/signalr"
import {MessagesApi} from "../../api/messagesApi";
import {messagesActions} from "../message/viewModel/message";


const sendMessage = declareAsyncAction<Omit<MessageData, 'id'>>(
    'sendMessage',
    async (messageData, store) => {
        if (messageData.text) {
            const connection = store.getState(connectionAtom)
            await connection?.invoke('Send', messageData.text, messageData.userName)
        }
    }
)

const deleteMessage = declareAsyncAction<string>(
    'deleteMessage',
    async (messageId, store) => {
        const connection = store.getState(connectionAtom)
        await connection?.invoke('Delete', messageId)
    }
)

export type EditMessage = {
    oldMessage: MessageData,
    newText: string
}

const editMessage = declareAsyncAction<EditMessage>(
    'edit',
    async (editMsg, store) => {
        if (editMsg.newText) {
            const connection = store.getState(connectionAtom)
            await connection?.invoke('Update', {
                id: editMsg.oldMessage.id,
                userName: editMsg.oldMessage.userName,
                text: editMsg.newText,
                time: editMsg.oldMessage.time,
            })
        }
    }
)

const loadMessages = declareAsyncAction<void>(
    'loadMessages',
    async (_, store) => {
        const messages = await MessagesApi.getMessages()
        store.dispatch(messagesActions.updateMessages(messages))
    }
)

const defaultEditMessage: MessageData = {text: "", userName: "", id: "", time: new Date()}

const [connectionAtom, setConnection] = declareAtomWithSetter<HubConnection|null>('connection', null, on => [
    on(authActions.logout, () => null),
])

const [messageTextAtom, setMessageText] = declareAtomWithSetter('messageTextAtom', '');
const [editMessageTextAtom, setEditMessageText] = declareAtomWithSetter('editMessageTextAtom', '');
const [editMessageIdAtom, setEditMessageId] = declareAtomWithSetter('editMessageIdAtom', '');
const [editingMessageAtom, setEditingMessage] = declareAtomWithSetter<MessageData>('editingMessage', defaultEditMessage)
const [enterBlockModeAtom, setEnterBlockMode] = declareAtomWithSetter('enterBlockModeAtom', EnterBlockMode.WRITE);

export const chatActions = {
    sendMessage,
    deleteMessage,
    loadMessages,
    editMessage,
    setMessageText,
    setEnterBlockMode,
    setEditMessageText,
    setEditMessageId,
    setEditingMessage,
    setConnection
}

export const chatAtoms = {
    connectionAtom,
    editingMessageAtom,
    messageTextAtom,
    enterBlockModeAtom,
    editMessageTextAtom,
    editMessageIdAtom,
}
