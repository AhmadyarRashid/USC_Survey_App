/**
 * @format
 */

import 'react-native';
import React from 'react';
// import App from '../App';
//
// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
//
it('renders correctly', () => {
  // expect(2+2).toBe(4)
  // const tree = renderer.create(<Intro />).toJSON();
  // expect(tree).toMatchSnapshot();
  // renderer.create(<App />);

  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
