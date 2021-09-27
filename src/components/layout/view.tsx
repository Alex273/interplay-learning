import React, {FC} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Dashboard} from '../dashboard';
import {Catalog} from '../catalog';
import {HelpCenter} from '../help-center';
import {Team} from '../team';
import {PrivateRoute} from '../../routing/private-route';
import { PATH } from '../../routing/routes';
import {Preloader} from '../common/preloader';

type LayoutProps = {
    loaded: boolean;
};

export const View: FC<LayoutProps> = (props: LayoutProps) => {
    const {loaded} = props;

    if (!loaded) {
        return <Preloader isOverlayBg />;
    }

    return (
        <Switch>
            <Route path={PATH.DASHBOARD}>
                <Dashboard loaded={true} />
            </Route>
            <Route path={PATH.CATALOG}>
                <Catalog loaded={true} />
            </Route>
            <PrivateRoute path={PATH.HELP_CENTER}>
                <HelpCenter loaded={true} />
            </PrivateRoute>
            <PrivateRoute path={PATH.TEAM}>
                <Team loaded={true} />
            </PrivateRoute>
            <Route path={PATH.HOME}>
                <Dashboard loaded={true} />
            </Route>
        </Switch>
    )
}
