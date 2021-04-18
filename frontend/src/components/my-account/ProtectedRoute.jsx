import React from 'react'
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute ({component: Component, ...rest}) {
  return (
    <Route {...rest} 
    render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}