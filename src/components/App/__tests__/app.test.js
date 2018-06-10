import React from 'react';
import { render, mount } from 'enzyme';

import App from '..';

jest.mock('utils/request');

describe('App', () => {
  it('renders initial loading state', () => {
    const wrapper = render(<App />);
    expect(wrapper.find('.ant-card-loading-content')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loaded state', (done) => {
    const wrapper = mount(<App />);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });

  it('renders correct count of bars', (done) => {
    const wrapper = mount(<App />);
    expect(wrapper.find('Bar')).toHaveLength(0);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('Bar')).toHaveLength(3);
      done();
    });
  });

  it('renders correct count of options', (done) => {
    const wrapper = mount(<App />);
    setTimeout(() => {
      wrapper.update();
      wrapper.find('.ant-select').simulate('click');
      const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
      expect(dropdownWrapper.find('MenuItem')).toHaveLength(3);
      done();
    });
  });

  it('renders correct count of buttons', (done) => {
    const wrapper = mount(<App />);
    expect(wrapper.find('Button')).toHaveLength(0);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('Button')).toHaveLength(4);
      done();
    });
  });

  it('active the first Bar automatically', (done) => {
    const wrapper = mount(<App />);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('Bar').first().props().active).toBe(true);
      done();
    });
  });

  it('active the correct Bar when selected', (done) => {
    const wrapper = mount(<App />);
    setTimeout(() => {
      wrapper.update();
      wrapper.find('.ant-select').simulate('click');
      const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
      const menuItemWrapper = dropdownWrapper.find('MenuItem').at(1);
      menuItemWrapper.simulate('click');
      wrapper.update();
      expect(wrapper.find('Bar').at(1).props().active).toBe(true);
      done();
    });
  });

  it('update value to the active Bar when Button clicked', (done) => {
    const wrapper = mount(<App />);
    setTimeout(() => {
      wrapper.update();
      const buttonWrapper2 = wrapper.find('Button').at(2);
      const buttonWrapper3 = wrapper.find('Button').at(3);
      buttonWrapper3.simulate('click'); // -40
      wrapper.update();
      buttonWrapper2.simulate('click'); // +15
      wrapper.update();
      expect(wrapper.find('Bar').at(0).props().value).toBe(15);
      done();
    });
  });
});
