'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Home from '../../src/www/js/components/Home.js';

jest.unmock('../../src/www/js/components/Home.js');

describe('<Home />', () => {
  it('should render without error', () => {
    const component = shallow(<Home />);

    expect(component.html()).toBe(`<div><h3>Home</h3></div>`);
  });
});
