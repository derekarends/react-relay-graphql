'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';
import User from '../../src/www/js/components/User.js';

jest.unmock('../../src/www/js/components/User.js');

describe('<User />', () => {
  let component;
  let componentDOMNode;
  let node = {
    id: '1',
    firstName: 'Derek',
    lastName: 'Arends',
  };

  it('should render without error', () => {
    const component = shallow(<User user={node} />);

    expect(component.html()).toBe(
      `<li>Derek Arends</li>`
    );
  });

  it('should render static html', () => {
    const component = shallow(<User user={node} />);

    expect(component.text()).toEqual('Derek Arends');
  });
});
