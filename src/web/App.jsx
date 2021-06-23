import React from'react'
import { renderRoutes } from 'react-router-config';
import { Switch,Route } from 'react-router-dom';
import routeList from '../routers';

const App = ({location,context})=>{
  return(
      <Switch>
        {/* <Route
          exact
          path="/"
          render={props => <Home name="Alligator.io" {...props} />}
        /> */}
          {renderRoutes(routeList)}
      </Switch>
  )
}

export default App