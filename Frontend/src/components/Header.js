import React, { Component } from 'react'
import { Link } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this);
  }
  logout() {
    localStorage.setItem("token", '');
    localStorage.clear();
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/Login"}>Özgeçmiş Panel</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {
                localStorage.getItem("token") ?
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Login"} onClick={() => this.logout()}>Çıkış Yap</Link>
                  </li>
                  :
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Login"} >Giriş Yap</Link>
                  </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
export default Header