/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectUserData } from 'services/selectors/auth';

interface IProtectedRoute {
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children, ...rest }) => {
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
