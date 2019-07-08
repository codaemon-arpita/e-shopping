/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import eShopTheme from '../../themes/eShop-theme';

/* eslint-disable no-param-reassign */
export const App = (props) => (
  <ThemeProvider theme={eShopTheme}>
    <div className="App">
      <section className="App-body" >{props.children}</section>
    </div>
  </ThemeProvider>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App
