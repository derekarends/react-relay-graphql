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

  it('<User user={node}/> to show Derek Arends', () => {
    const userComponent = shallow(
      <User user={node} />
    );

    expect(userComponent).contains(<li>Derek Arends</li>).toBe(true);

    expect(userComponent.text()).toEqual('Derek Arends');
  });

  // describe('A suite', function() {
  //   it('should render without throwing an error', function() {
  //     expect(shallow(<Foo />).contains(<div className="foo">Bar</div>)).toBe(true);
  //   });
  //
  //   it('should be selectable by class "foo"', function() {
  //     expect(shallow(<Foo />).is('.foo')).toBe(true);
  //   });
  //
  //   it('should mount in a full DOM', function() {
  //     expect(mount(<Foo />).find('.foo').length).toBe(1);
  //   });
  //
  //   it('should render to static HTML', function() {
  //     expect(render(<Foo />).text()).toEqual('Bar');
  //   });
  // });

});
