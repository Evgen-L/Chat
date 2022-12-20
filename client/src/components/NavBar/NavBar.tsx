import { Header } from "antd/lib/layout/layout"
import React from 'react';
import styles from './NavBar.module.css'
import {Button} from "antd";
import {useAction} from "@reatom/react";
import {authActions} from "../../auth/viewModel/auth";

const NavBar = () => {

    const exit = useAction(authActions.logout)

    return (
        <Header className={styles.header}>
            <Button
            onClick={exit}
            type="primary"
            size="small">
                Выйти
            </Button>
        </Header>
    );
};

export default NavBar;