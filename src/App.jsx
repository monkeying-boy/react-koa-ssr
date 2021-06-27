import React from'react'
import { Switch,Route } from 'react-router-dom';
import routeList from './routers';

const App = ({location,context})=>{
  return(
      <Switch>
        {/* <Route
          exact
          path="/"
          render={props => <Home name="Alligator.io" {...props} />}
        /> */}

        {
          routeList.map( item => (
            <Route
              key={item.path}
              {...item}
            />
          ))
        }
          {/* {renderRoutes(routeList)} */}
      </Switch>
  )
}

export default App