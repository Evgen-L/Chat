import {declareAction} from "@reatom/core"
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter"

const logout = declareAction('logout')
const login = declareAction('login')

const [isAuthUserAtom] = declareAtomWithSetter<boolean>('isAuthUser', false, on => [
    on(logout, () => false),
    on(login, () => true),
])


 const [userNameAtom, setUserName] = declareAtomWithSetter('userName', '',on => [
    on(logout, () => '')
     ]
 );


export const authActions = {
    logout,
    login,
    setUserName,
}

export const authAtoms = {
    isAuthUserAtom,
    userNameAtom,
}