import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../pages/main/index-main';
import Footer from '../components/footer/index-footer';

// BrowserRouter: Just tells all the pages will be in the browser as the BrowserRouter can do other things as well... 
// Fragment: Just to not use the automatic configuration of the web page,
//          and because "BrowserRouter" can have only 1 child that is "Switch" is this case.
// Switch: Doesn't allow the application call all the routes to find the route called.
//         Ex: If we had more than 1 route and the user called one (/reactjs) the Browser would look in all the routes to find when "Switch" stops when it finds out the exact route.
//         Ex2: "exact" does the same. We use 'exact' in "Home" for example.
// Route: The Route that we are working with.

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