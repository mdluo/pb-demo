import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Card, Icon } from 'antd';

import styles from './Page.module.less';

const { Footer, Content } = Layout;

const Link = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

class Page extends Component {
  render() {
    const { children, loading } = this.props;
    return (
      <Layout className={styles.layout}>
        <Content>
          <Card
            className={styles.card}
            bordered={false}
            title="Progress Bar Demo"
            extra={<Link href="https://github.com/mdluo/pb"><Icon type="link" /> GitHub</Link>}
            loading={loading}
          >
            {children}
          </Card>
        </Content>
        <Footer>
          <p>Powered by <Link href="https://github.com/facebook/create-react-app">CRA</Link>, <Link href="https://ant.design/">Antd</Link> and more.</p>
          <p>Made with <Icon className={styles.heart} type="heart" /> by <Link href="https://github.com/mdluo">mdluo</Link>.</p>
        </Footer>
      </Layout>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

Page.defaultProps = {
  loading: false,
};

export default Page;
