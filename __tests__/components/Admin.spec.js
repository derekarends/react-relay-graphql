'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Admin from '../../src/www/js/components/Admin.js';

jest.unmock('../../src/www/js/components/Admin.js');
jest.mock('react-relay');

let viewer = {
  id: 'randomAdminId',
};

describe('<Admin />', () => {
  it('should render welcome message', () => {
    const component = shallow(<Admin viewer={viewer}/>);

    expect(component.text()).toContain('Welcome to the admin view ' + viewer.id);
  });

  it('should contain user list component', () => {
    const component = shallow(<Admin viewer={viewer}/>);

    expect(component.find('UserList').length).toBe(1);
  });

  it('should render container add user component', () => {
    const component = shallow(<Admin viewer={viewer}/>);

    expect(component.find('AddUser').length).toBe(1);
  });
});
