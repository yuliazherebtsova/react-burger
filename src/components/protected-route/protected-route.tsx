/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { selectUserData } from 'services/selectors/auth';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useSelector(selectUserData);

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
