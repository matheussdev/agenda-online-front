import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom'
import Admin from './pages/Admin';
import Login from './pages/login/index';

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
            </BrowserRouter>
         );
    }
}
 
export default Routes;