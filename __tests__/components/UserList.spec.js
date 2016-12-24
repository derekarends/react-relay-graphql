'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import { UserList } from '../../src/www/js/components/UserList.js';

jest.unmock('../../src/www/js/components/UserList.js');
jest.mock('react-relay');

describe('<UserList />', () => {
  let component;
  let componentDOMNode;

  //viewer.users.edges
  let viewer = {
    users: {
      edges: [
      {
        node: {
          id: '1',
          firstName: 'Derek',
          lastName: 'Arends',
        },
      }]
    },
  };

  it('<UserList viewer={viewer}/> to show Derek Arends', () => {
    const userComponent = shallow(
      <UserList viewer={viewer} />
    );

    expect(userComponent.text()).toEqual('Derek Arends');
  });
});
