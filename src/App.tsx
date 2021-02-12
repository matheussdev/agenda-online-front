import React from 'react';
import Routes from './routes';

export interface AppProps {
  
}
 
export interface AppState {
  
}
 
class App extends React.Component<AppProps, AppState> {
  state = {  }
  render() { 
    return ( 
      <Routes/>
      );
  }
}
 
export default App;