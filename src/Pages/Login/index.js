import React, { useState } from "react";
import Api from "../../Services/Api";
import { useHistory } from "react-router-dom";

import { login } from "../../Services/Auth";

import "./login.css";

import Logo from "../../Images/logoBlanck.png";
import background from "../../Images/loginBackground.jpg";

import swal from "sweetalert";

const Login = (props) => {
  let history = useHistory();

  const [Inputs, SetInputs] = useState();
  const [loading, SetLoading] = useState(false);

  const HandleLogin = async (e) => {
    e.preventDefault();
    SetLoading(true);

    try {
      const { data } = await Api.post("sessions", Inputs);
      login(data.token);
      localStorage.setItem("username", data.username);
      history.push("/newSale");
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      const { status } = error.response;

      if (status === 401) {
        swal("", "Email ou Senha Incorretos !", "error");
      } else {
        console.log(error.response);
        swal("", "Erro Desconhecido !", "error");
      }
    }
  };

  const showStateOfLogin = () => {
    if (loading) {
      return "logando ...";
    } else {
      return "logar";
    }
  };

  return (
    <div
      id="wrap-login"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
      }}
    >
      <form
        className="login-form"
        style={{
          borderRadius: "5px",
          background: "#fff",
        }}
      >
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#0B20FF",
            height: "150px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "5px",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
            flexDirection: "column",
            padding: "15px",
          }}
        >
          <img src={Logo} alt="logo" width="80px" height="80px" />
          <div
            className="appName"
            style={{ color: "#FFF", fontSize: "20px", fontWeight: "bold" }}
          >
            Caixa
          </div>
        </div>
        <div style={{ padding: "15px" }}>
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
              style={{
                width: "100%",
                backgroundColor: "#0B20FF",
                paddingTop: "5px",
                paddingBottom: "5px",
                color: "#FFF",
                fontSize: "15px",
                border: "0",
                borderRadius: "5px",
                boxShadow: "5px 2px 10px gray",
                fontWeight: "bolder",
              }}
              onClick={(e) => {
                HandleLogin(e);
              }}
            >
              {showStateOfLogin()}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
