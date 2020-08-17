import React, { useState } from "react";
import Api from "../../Services/Api";
import { useHistory } from "react-router-dom";

import { login } from "../../Services/Auth";

import "./login.css";

import Logo from "../../Images/logo.png";
import swal from "sweetalert";

const Login = (props) => {
  let history = useHistory();

  const [Inputs, SetInputs] = useState();

  const HandleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Api.post("sessions", Inputs);
      login(data.token);
      localStorage.setItem("username", data.username);

      history.push("/newSale");
    } catch (error) {
      swal("", "Erro, Contacte o Programador !", "error");
    }
  };

  return (
    <div
      id="wrap-login"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "150px",
      }}
    >
      <form
        className="login-form"
        style={{
          border: "1px solid gainsboro",
          borderRadius: "5px",
          padding: "10px",
          background: "gainsboro",
          boxShadow: "5px 5px 2px white",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img src={Logo} alt="logo" width="100px" height="100px" />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={(e) => {
              SetInputs({ ...Inputs, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => {
              SetInputs({ ...Inputs, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary btn-large"
            style={{ width: "100%" }}
            onClick={(e) => {
              HandleLogin(e);
            }}
          >
            Logar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
