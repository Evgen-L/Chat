import React from 'react';
import {Button, Form, Input, Space} from "antd";
import styles from './Auth.module.css'
import {authActions, authAtoms} from "../viewModel/auth";
import {useAction, useAtom} from "@reatom/react";
import {CHAT_ROUTE} from "../../utils/consts";
import {Redirect} from "react-router-dom";

const Auth = () => {
    const isUserAuth = useAtom(authAtoms.isAuthUserAtom)
    const userName = useAtom(authAtoms.userNameAtom)

    const handleLogin = useAction(authActions.login)
    const handleSetUserName = useAction(authActions.setUserName)

    const onLogIn = () => {
        if (userName)
            handleLogin()
    };

    if (isUserAuth) {
        return <Redirect to={CHAT_ROUTE} />
    }

    return (
        <div className={styles.content}>
            <Form
                name="auth"
                style={{marginTop: 50}}
            >
                <Form.Item
                    name="userName"
                >
                    <Input value={userName} placeholder="type your username" onChange={e => handleSetUserName(e.target.value.trim())}/>
                </Form.Item>

                <Space direction="vertical" style={{ width: '100%' }}>
                    <Button type="primary" onClick={onLogIn} block>
                        Enter the chat
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

export default Auth;