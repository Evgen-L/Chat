import {MessageData} from "../../../types/messageData";
import {declareMapAtom} from "../../../core/reatom/declareMapAtom";

const {
    atom: messagesAtom,
    updateItems: updateMessages,
    updateItem: updateMessage,
    removeItems: removeMessage,
    setNewItems: setNewMessages,
} = declareMapAtom<MessageData>(
    'messages',
    message => message.id,
)

const messagesActions = {
    updateMessages,
    updateMessage,
    removeMessage,
    setNewMessages,
}

export {
    messagesAtom,
    messagesActions,
}