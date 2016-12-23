'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import { User } from '../../src/www/js/components/User.js';

jest.unmock('../../src/www/js/components/User.js');

describe('<User />', () => {
  let component;
  let componentDOMNode;
  let node = {
    id: '1',
    firstName: 'Derek',
    lastName: 'Arends',
  };

  it('<User user={node}/> to show Derek Arends', () => {
    const userComponent = shallow(
      <User user={node} />
    );

    expect(userComponent.text()).toEqual('Derek Arends');
  });
});
