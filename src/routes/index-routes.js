import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../pages/main/index-main';
import Footer from '../components/footer/index-footer';

const Routes = ()=> (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
      <Footer />
      </Fragment>
  </BrowserRouter>
);  

export default Routes;