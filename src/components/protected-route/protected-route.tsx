/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { selectUserData } from 'services/selectors/auth';

const ProtectedRoute: React.FC<RouteProps & { children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  const { user } = useSelector(selectUserData);

  const location = useLocation<{ from: { pathname: string } }>();

  return (
    <Route {...rest}>
      {user ? (
        children 
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )}
    </Route>
  );
};

export default ProtectedRoute;
