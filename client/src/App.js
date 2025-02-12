import './App.css';
import {useRoutes} from './routes'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";


const App = () => {

    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)




    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <div className="outline-none focus:outline-none">
                {routes}
            </div>

        </AuthContext.Provider>

    );
}

export default App;
