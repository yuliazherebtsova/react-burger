/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectUserData } from 'services/selectors/auth';
import { getUserData } from 'services/thunks/auth';

interface IProtectedRoute {
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children, ...rest }) => {
  const { user } = useSelector(selectUserData);

  if (user) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
