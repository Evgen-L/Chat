import {CHAT_ROUTE, AUTH_ROUTE} from "../utils/consts";
import Auth from "../auth/view/Auth";
import Chat from "../chat/view/Chat";

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    }
]

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: Chat
    }
]