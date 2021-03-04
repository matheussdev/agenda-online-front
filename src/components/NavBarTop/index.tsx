import {
  faBars,
  faCalendarAlt,
  faHome,
  faSignOutAlt,
  faTasks,
  faTimes,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export interface NavBarTopProps {}

export interface NavBarTopState {}

class NavBarTop extends React.Component<NavBarTopProps, NavBarTopState> {
  _logOut() {
    localStorage.setItem("token", "");
    window.location.replace("/login");
  }
  showMenu(evento:any){
    console.log(evento.target.classList)
    evento.target.classList.value='iconMenuHide'
    const menu:any = document.querySelector('.nav-bar-top')
    menu.style.display = "flex";
  }
  closeMenu(evento:any){
    const menu:any = document.querySelector('.nav-bar-top')
    const menuicon:any = document.querySelector('.iconMenuHide')
    menu.style.display = "none";
    console.log(menuicon.clasList)
    menuicon.classList.value='iconMenu'
    
  }
  render() {
    return (
      <div>
      <div className="top-bar-mobile">
        <h2>📅 Agenda online</h2>
        <h2 className="iconMenu"  onClick={this.showMenu.bind(this)} >
          <span id="menuIconTop"> <FontAwesomeIcon icon={faBars} /></span>
        </h2>
      </div>
      <nav className="nav-bar-top">
        <h1 className="icon-close"> <span onClick={this.closeMenu.bind(this)}><FontAwesomeIcon icon={faTimes}/></span></h1>
        <h1 className="logoIcon">📅</h1>
        <p className="logoName">Agenda Online</p>
        <ul>
          <li>
            <Link to="/admin" id="link-select">
              <FontAwesomeIcon icon={faHome} /> HOME
            </Link>
          </li>
          <li>
            <Link to="/admin">
              <FontAwesomeIcon icon={faCalendarAlt} /> AGENDA
            </Link>
          </li>
          <li>
            <Link to="/admin/perfil">
              <FontAwesomeIcon icon={faUserCog} /> PERFIL
            </Link>
          </li>
          <li>
            <Link to="/admin/servicos">
              <FontAwesomeIcon icon={faTasks} /> SERVIÇOS
            </Link>
          </li>
          <li onClick={this._logOut.bind(this)}>
            <a href="/login">
              <FontAwesomeIcon icon={faSignOutAlt} /> SAIR
            </a>
          </li>
        </ul>
      </nav>
      </div>
    );
  }
}

export default NavBarTop;
