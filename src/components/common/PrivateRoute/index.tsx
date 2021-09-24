import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';

import { PATH } from '../../../routing/routes';

export const PrivateRoute: FC<RouteProps> = ({ children, path, ...rest }) => {
    // const { loading, isAuthenticated } = useAuth();

    // if (!loading && !isAuthenticated) {
    //     return <Redirect to={PATH.DASHBOARD} />;
    // }
    //
    // const render = () => (!loading && isAuthenticated ? children : null);

    const render = () => children;

    return <Route path={path} render={render} {...rest} />;
};