import React from 'react';

export interface NavBarProps {
  
}
 
export interface NavBarState {
  
}
 
class NavBar extends React.Component<NavBarProps, NavBarState> {
  _logOut() {
    localStorage.setItem("token", "");
    window.location.replace("/login");
  }
  render() { 
    return ( 
      <nav className="nav-bar">
          <ul>
            <li>HOME</li>
            <li>AGENDA</li>
            <li>PERFIL</li>
            <li>Serviços</li>
            <li onClick={this._logOut.bind(this)}>SAIR</li>
          </ul>
        </nav>
     );
  }
}
 
export default NavBar;