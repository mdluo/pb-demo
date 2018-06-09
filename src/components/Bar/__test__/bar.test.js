import React from 'react';
import { render, mount } from 'enzyme';

import { Progress } from 'antd';
import Bar from '..';

describe('Bar', () => {
  it('renders correctly', () => {
    const wrapper = render(<Bar value={50} limit={100} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders active correctly', () => {
    const wrapper = render(<Bar active value={50} limit={100} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('mounts one <Progress /> component', () => {
    const wrapper = mount(<Bar value={50} limit={100} />);
    expect(wrapper.find(Progress)).toHaveLength(1);
  });

  it('renders normal value (aliquot)', () => {
    const wrapper = render(<Bar value={50} limit={100} />);
    expect(wrapper.find('.percentage').text()).toBe('50%');
    expect(wrapper.find('.value').text()).toBe('(50)');
  });

  it('renders normal value (aliquant)', () => {
    const wrapper = render(<Bar value={50} limit={120} />);
    expect(wrapper.find('.percentage').text()).toBe('41%');
    expect(wrapper.find('.value').text()).toBe('(50)');
  });

  it('renders negative value', () => {
    const wrapper = render(<Bar value={-50} limit={100} />);
    expect(wrapper.find('.percentage').text()).toBe('0%');
    expect(wrapper.find('.value').text()).toBe('(0)');
  });

  it('throw on negative limit', () => {
    expect(() => {
      render(<Bar value={50} limit={-100} />);
    }).toThrow();
  });

  it('renders 100% value', () => {
    const wrapper = render(<Bar value={120} limit={120} />);
    expect(wrapper.find('.percentage').text()).toBe('100%');
    expect(wrapper.find('.value').text()).toBe('(120)');
    expect(wrapper.find('.ant-progress-status-exception')).toHaveLength(0);
  });

  it('renders over-limit value', () => {
    const wrapper = render(<Bar value={120} limit={100} />);
    expect(wrapper.find('.percentage').text()).toBe('120%');
    expect(wrapper.find('.value').text()).toBe('(120)');
    expect(wrapper.find('.ant-progress-status-exception')).toHaveLength(1);
  });
});
