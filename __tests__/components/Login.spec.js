'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Login from '../../src/www/js/components/Login.js';

jest.unmock('../../src/www/js/components/Login.js');

describe('<Login />', () => {
  it('should render without error', () => {
    const component = shallow(<Login />);

    expect(component.html()).toBe(
      `<h3>Login</h3>`
    );
  });
});
