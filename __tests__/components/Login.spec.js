'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Login from '../../src/www/js/components/Login.js';

jest.unmock('../../src/www/js/components/Login.js');

describe('<Login />', () => {
  let auth = {
    login: function () { },
    logout: function () { },
  };

  it('should render login when not authenticated', () => {
    auth.loggedIn = () => false;

    const component = shallow(<Login auth={auth}/>);

    expect(component.html()).toBe(
      `<div><input type="button" value="Login"/></div>`
    );
  });

  it('should call login when login is clicked', () => {
    auth.login = sinon.spy();
    auth.loggedIn = () => false;

    const component = shallow(<Login auth={auth}/>);

    component.find('input').simulate('click');
    expect(auth.login.calledOnce).toBe(true);
  });

  it('should render logout when authenticated', () => {
    auth.loggedIn = () => true;

    const component = shallow(<Login auth={auth}/>);

    expect(component.html()).toBe(
      `<div><input type="button" value="Logout"/></div>`
    );
  });

  it('should call logout when logout is clicked', () => {
    auth.logout = sinon.spy();
    auth.loggedIn = () => true;

    const component = shallow(<Login auth={auth}/>);

    component.find('input').simulate('click');
    expect(auth.logout.calledOnce).toBe(true);
  });
});
