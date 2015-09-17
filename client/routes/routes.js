import {Route} from 'react-router';
import React from 'react';
import {CoreLayout} from 'layouts';
import {HomeView, UserEditView, NotFoundView} from 'views';

export default (
  <Route component={CoreLayout}>
    <Route name='home' path='/' component={HomeView}/>
    <Route path='edit' component={UserEditView}/>
    <Route path='*' component={NotFoundView}/>
  </Route>
);
