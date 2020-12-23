import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {MessagesPage} from "./pages/MessagesPage";
import {AuthPage} from "./pages/AuthPage";
import {MotionLayoutProvider} from "react-motion-layout";
import Message from "./components/Message";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <MotionLayoutProvider>
                <Switch>
                    <Route path="/messages" exact>
                        <MessagesPage/>
                    </Route>
                    <Route path="/message/:messageId">
                        <Message />
                    </Route>

                    <Redirect to="/messages"/>
                </Switch>
            </MotionLayoutProvider>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}