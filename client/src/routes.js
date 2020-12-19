import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {MessagesPage} from "./pages/MessagesPage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/messages" exact>
                    <MessagesPage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/messages" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}