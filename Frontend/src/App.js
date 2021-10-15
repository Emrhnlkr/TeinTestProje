import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateCv from './components/CreateCv';
import Login from "./components/Login";
import ListCv from './components/ListCv';
import UpdateCv from './components/UpdateCv';
import Header from './components/Header';
import ListAdminCv from './components/ListAdminCv';
function App() {
  return (<Router>
    <div className="App">
      <Header />
      <div className="outer">
        <div className="container">
          <Switch>
            <Route path="/Listcv"  component={ListCv}></Route>
            <Route path="/Updatecv/:id" component={UpdateCv}></Route>
            <Route path="/Addcv/:id" component={CreateCv}></Route>
            <Route path="/Login" exact component={Login} />
            <Route path="/Listadmin"  component={ListAdminCv} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}
export default App;
