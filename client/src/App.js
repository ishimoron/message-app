import './App.css';

import {useRoutes} from './routes'
import {Grid} from "@material-ui/core";
import {useAuth} from "./hooks/auth.hook";

import 'materialize-css'
import {AuthContext} from "./context/AuthContext";

const App = () => {

    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Grid container xs={12}>
                {routes}
            </Grid>
        </AuthContext.Provider>

    );
}

export default App;
