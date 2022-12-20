import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom"
import {privateRoutes, publicRoutes} from "../core/routes";
import {AUTH_ROUTE} from "../utils/consts";

const AppRouter = () => {
    return (
        <Switch>
            {
                publicRoutes.map(route =>
                    <Route key={"0"} exact path={[route.path]} component={route.Component}/>
                )


            }
            {
                privateRoutes.map(route =>
                    <Route key={"1"} exact path={[route.path]} component={route.Component}/>
                )
            }
            {
                <Redirect to={AUTH_ROUTE}/>
            }

        </Switch>
    )
};

export default AppRouter;