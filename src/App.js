import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./Pages/Login";

import ListClients from "./Pages/ListClients";
import AddNewClient from "./Pages/AddNewClient";
import AddNewProduct from "./Pages/AddNewProduct";
import ListProducts from "./Pages/ListProducts";
import AddNewSale from "./Pages/AddNewSale";
import Reports from "./Pages/Reports";
import SettingsPage from "./Pages/Settings";

import { isAuthenticated } from "./Services/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/newSale" component={AddNewSale} />
        <PrivateRoute path="/clients" component={ListClients} />
        <PrivateRoute path="/settings" component={SettingsPage} />
        <PrivateRoute path="/products" component={ListProducts} />
        <PrivateRoute path="/newClient" component={AddNewClient} />
        <PrivateRoute path="/newProduct" component={AddNewProduct} />
        <PrivateRoute path="/newSale/:user_id" component={AddNewSale} />
        <PrivateRoute path="/reports" component={Reports} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
