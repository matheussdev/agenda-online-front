import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom'
import Admin from './pages/Admin';
import Login from './pages/login/index';
import Profile from './pages/Perfil';
import Register from './pages/register';
import Services from './pages/Services';

export interface Props {
    
}
 
export interface State {
    
}
 
class Routes extends React.Component<Props, State> {
    state = {  }
    render() { 
        return ( 
            <BrowserRouter>
                <Route path="/login" component={Login} exact />
                <Route path="/admin" component={Admin} exact />
                <Route path="/admin/servicos" component={Services} exact />
                <Route path="/admin/perfil" component={Profile} exact />
                <Route path="/register" component={Register} exact />

            </BrowserRouter>
         );
    }
}
 
export default Routes;