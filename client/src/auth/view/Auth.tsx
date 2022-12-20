import React, {useState} from 'react';
import {Button, Form, Input, Space} from "antd";
import styles from './Auth.module.css'
import {authActions, authAtoms} from "../viewModel/auth";
import {useAction, useAtom} from "@reatom/react";
import {CHAT_ROUTE} from "../../utils/consts";
import {Redirect} from "react-router-dom";

const Auth = () => {
    const [fieldUserName, setFieldUserName] = useState("")

    const isUserAuth = useAtom(authAtoms.isAuthUserAtom)
    const handleLogin = useAction(authActions.login)

    const onLogIn = () => {
        if (fieldUserName) {
            handleLogin(fieldUserName)
        }
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
                    <Input value={fieldUserName} placeholder="type your username" onChange={e => setFieldUserName(e.target.value.trim())}/>
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