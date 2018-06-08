import React, { Component } from 'react';
import { Button } from 'antd';

import logo from './logo.svg';
import styles from './App.module.less';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>Welcome to React</h1>
        </header>
        <p className={styles.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button icon="star-o">Antd Button</Button>
      </div>
    );
  }
}

export default App;
