import React from 'react';
import { render } from 'enzyme';

import Page from '../Page';

describe('Bar', () => {
  it('renders correctly', () => {
    const wrapper = render(<Page>Content</Page>);
    expect(wrapper).toMatchSnapshot();
  });
});
