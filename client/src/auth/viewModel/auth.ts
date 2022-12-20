import {declareAction} from "@reatom/core"
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter"

const logout = declareAction('logout')
const login = declareAction<string>('login')

const [isAuthUserAtom] = declareAtomWithSetter<boolean>('isAuthUser', false, on => [
    on(logout, () => false),
    on(login, () => true),
])


 const [userNameAtom, setUserName] = declareAtomWithSetter('userName', '',on => [
    on(logout, () => ''),
     on(login, (state: string, name: string) => name)
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