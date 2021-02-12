import React from "react";
import "./style.css";

import api from "../../services/api";

export interface LoginProps {}

export interface LoginState {}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    user: Object,
  };
  username: String;
  password: string;
  constructor(props: LoginProps | Readonly<LoginProps>) {
    super(props);
    this.username = "";
    this.password = "";
  }

  _setLogin(event: any) {
    this.username = event.target.value;
  }
  _setPass(event: any) {
    this.password = event.target.value;
  }

  async _login() {
    const password = this.password;
    const username = this.username;
    await api
      .post(`/login`, { username, password })
      .then((res) => {
        const user = res.data;
        this.setState({ user });
        api.defaults.headers.authorization = `Bearer ${user.token}`;
        localStorage.setItem("token", user.token);
        console.log(user);
        console.log(api.defaults.headers.authorization);
        window.location.replace("/admin");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <section id="login-container">
        <div className="content-login">
          <h1>Login</h1>
          <form method="POST">
            <fieldset>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                placeholder="digite aqui..."
                autoFocus
                autoComplete="on"
                required
                onChange={this._setLogin.bind(this)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="digite aqui..."
                required
                onChange={this._setPass.bind(this)}
              />
            </fieldset>
            <button
              type="button"
              className="sigin-button"
              onClick={this._login.bind(this)}
            >
              Logar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
