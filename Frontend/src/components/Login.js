import React, { Component } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../login.css';
import CvService from '../services/CvService';
const validationSchema = Yup.object({
  login: Yup.string().required("Lütfen kullanıcı adınızı giriniz."),
  password: Yup.string().required("Lütfen şifrenizi giriniz.")
});
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: null,
      password: null
    }
  }
  //fecth ile login işlemi yapılıyor.
  login() {
    fetch('http://localhost:8081/auth', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }).then((response) => {
      response.json().then((result) => {
        localStorage.setItem("token", result.token); //token'i localstorage kaydediyor.
        this.setState({ loginState: true })
        if (response.ok) {
          CvService.getInfo().then(res => {
            if (res.data.roleEntity.name === "ROLE_ADMIN") {
              this.props.history.push("/Listadmin")
              window.location.reload();
            } else {
              this.props.history.push('/Listcv');
              window.location.reload();
            }
          });
        } else {
          this.props.history.push("/Login")

        }
      })
    })
  }
  render() {
    return (
      <Formik
        initialValues={{ login: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ handleSubmit, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <div id="loginform">
              <h2 id="headerTitle">Giriş Yap</h2>
              <div>
                <div className="row">
                  <label>Kullanıcı Adı</label>
                  <input type="text" className="form-control" values={values.login} placeholder="Kullanıcı Adı Giriniz"
                    onChange={(event) => { this.setState({ login: event.target.value }) }} />
                </div>
                <div className="text-center" style={{ color: 'red', margin: '5px' }}>  {errors.login ?  errors.login : null}</div>
                <div className="row">
                  <label>Şifre</label>
                  <input type="password" className="form-control" values={values.password} placeholder="Şifre Giriniz"
                    onChange={(event) => { this.setState({ password: event.target.value }) }} />
                </div>
                <div className="text-center" style={{ color: 'red', margin: '5px' }}> {errors.password ? errors.password : null}</div>
                <div id="button" className="row">
                  <button onClick={() => { this.login() }}>giriş yap</button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>

    );
  }
}