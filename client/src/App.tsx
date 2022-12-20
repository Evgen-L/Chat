import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {createStore} from "@reatom/core";
import { context } from '@reatom/react';
import styles from './App.module.css';

export const store = createStore();

function App() {
  return (
    <div className={styles.app}>
        <context.Provider value={store}>
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
        </context.Provider>
    </div>
  );
}

export default App;
