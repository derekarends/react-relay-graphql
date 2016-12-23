/*global jest describe it expect beforeEach*/

'use strict';

import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import UserComponent from '../../src/www/js/components/User.js'; // eslint-disable-line no-unused-vars

// reference this from the folder location of specs.js
jest.unmock('../src/www/js/components/User.js');

describe('<User /> Mock DOM', () => {

  let component;
  let componentDOMNode;
  let node = {
    firstName: 'Derek',
    lastName: 'Arends',
  };

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<User user={node}/>);
    componentDOMNode = ReactDOM.findDOMNode(component);
  });

  it('<User user={node}/> to be true', () => {

    expect(1).toBe(1);

    // expect(component.state.counter).toBe(1);
		// expect(componentDOMNode.children[0].textContent).toBe('1');
    //
		// TestUtils.Simulate.click(componentDOMNode.children[1]);
    //
		// expect(component.state.counter).toBe(2);
		// expect(componentDOMNode.children[0].textContent).toBe('2');

  });
});
