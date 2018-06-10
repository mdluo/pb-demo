import React, { Component } from 'react';
import { Select, Button, Row, Col } from 'antd';

import Page from 'components/Layout/Page';
import Bar from 'components/Bar';
import request from 'utils/request';

import styles from './App.module.less';

const { Option } = Select;

class App extends Component {
  state = {
    loading: true,
    active: null,
    bars: null,
    buttons: null,
    limit: null,
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    const { data } = await request();
    if (data) {
      this.setState({
        active: 0,
        bars: data.bars.map((value, id) => ({ id, value })),
        buttons: data.buttons.map((value, id) => ({ id, value })),
        limit: data.limit,
        loading: false,
      });
    }
  }

  handleSelect = (active) => {
    this.setState({ active });
  }

  handleClick = (value) => {
    const { active, bars } = this.state;
    this.setState({
      bars: bars.map((bar) => {
        if (bar.id === active) {
          return {
            id: bar.id,
            value: Math.max(0, bar.value + value),
          };
        }
        return bar;
      }),
    });
  }

  render() {
    const { loading, active, bars, buttons, limit } = this.state;
    return (
      <Page loading={loading}>
        <p>Limit: <b>{limit}</b></p>
        <div className={styles.bars}>
          {bars && bars.map(({ id, value }) => (
            <Bar key={id} limit={limit} value={value} active={active === id} />
          ))}
        </div>
        <Row gutter={24}>
          <Col className={styles.select} xs={24} sm={8}>
            <Select style={{ width: '100%' }} value={active} onChange={this.handleSelect}>
              {bars && bars.map(({ id }) => (
                <Option key={id} value={id}>
                  # Progress {id + 1}
                </Option>
              ))}
            </Select>
          </Col>
          <Col className={styles.buttons} xs={24} sm={16}>
            {buttons && buttons.map(({ id, value }) => (
              <Button key={id} onClick={() => this.handleClick(value)}>
                {value >= 0 ? `+${value}` : value}
              </Button>
            ))}
          </Col>
        </Row>
      </Page>
    );
  }
}

export default App;
