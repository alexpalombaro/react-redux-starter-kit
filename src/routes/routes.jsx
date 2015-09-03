import {Route} from 'react-router';
import React from 'react';
import {CoreLayout} from 'layouts';
import HomeView from 'views/Home';

export default (
  <Route component={CoreLayout}>
    <Route name='home' path='/' component={HomeView}/>
  </Route>
);