import React, {FC} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Dashboard} from '../Dashboard';
import {Catalog} from '../Catalog';
import {HelpCenter} from '../HelpCenter';
import {Team} from '../Team';
import {PrivateRoute} from '../common/PrivateRoute';
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
                <Dashboard />
            </Route>
            <Route path={PATH.CATALOG}>
                <Catalog />
            </Route>
            <PrivateRoute path={PATH.HELP_CENTER}>
                <HelpCenter />
            </PrivateRoute>
            <PrivateRoute path={PATH.TEAM}>
                <Team />
            </PrivateRoute>
        </Switch>

    )
}