import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import classnames from 'classnames';

import styles from './Bar.module.less';

class Bar extends PureComponent {
  state = {
    percent: 0,
    value: 0,
  }

  static getDerivedStateFromProps(props) {
    if (props.limit <= 0) {
      throw new Error('The `limit` prop should be greater than 0.');
    }
    let percent = 0;
    const value = Math.max(props.value, 0);
    if (props.value > 0) {
      percent = Math.floor((props.value / props.limit) * 100);
    }
    return { percent, value };
  }

  render() {
    const { active, height } = this.props;
    const { percent, value } = this.state;
    return (
      <div className={classnames(styles.bar, { active }, { full: percent >= 100 })}>
        <Progress
          strokeWidth={height}
          showInfo={false}
          percent={percent}
          status={percent > 100 ? 'exception' : null}
        />
        <div
          className={styles.reading}
          style={{ lineHeight: `${height}px` }}
        >
          <span className={styles.percentage}>
            {percent}%
          </span>
          <span className={styles.value}>
            ({value})
          </span>
        </div>
      </div>
    );
  }
}

Bar.propTypes = {
  active: PropTypes.bool,
  limit: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  height: PropTypes.number,
};

Bar.defaultProps = {
  active: false,
  height: 32,
};

export default Bar;
