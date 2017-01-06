'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import AddUser from '../../src/www/js/components/AddUser.js';

jest.unmock('../../src/www/js/components/AddUser.js');

describe('<AddUser />', () => {
  it('renders without error', () => {
    const component = shallow(<AddUser />);
    expect(component.html()).toContain('<div>');
  });

  it('contains an input field', () => {
    const component = shallow(<AddUser />);
    expect(component.find('[type="text"]').length).toBe(1);
  });

  it('contains a submit button', () => {
    const component = shallow(<AddUser />);
    expect(component.find('[type="button"]').length).toBe(1);
  });

  it('contains a submit button with a value of Submit', () => {
    const component = shallow(<AddUser />);
    expect(component.find('[value="Submit"]').length).toBe(1);
  });
});
