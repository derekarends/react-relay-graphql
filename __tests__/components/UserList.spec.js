'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import UserList from '../../src/www/js/components/UserList.js';
import User from '../../src/www/js/components/User.js';

jest.unmock('../../src/www/js/components/UserList.js');
jest.mock('react-relay');

describe('<UserList />', () => {
  let component;
  let componentDOMNode;

  it('should render without error', () => {
    //viewer.users.edges
    let node = {
      id: '1',
      firstName: 'Derek',
      lastName: 'Arends',
    };

    let viewer = {
      users: {
        edges: [
        {
          node: node,
        }]
      },
    };

    const component = shallow(<UserList viewer={viewer} />);

    expect(component.contains(<ul><User user={node} /></ul>)).toBe(true);
  });

  it('should render multiple users', () => {
    //viewer.users.edges
    let node = {
      id: '1',
      firstName: 'Derek',
      lastName: 'Arends',
    };

    let viewer = {
      users: {
        edges: [
        {
          node: node,
        },
        {
          node: node,
        }]
      },
    };

    const component = shallow(<UserList viewer={viewer} />);

    expect(component.find('User').length).toBe(2);
  });
});
