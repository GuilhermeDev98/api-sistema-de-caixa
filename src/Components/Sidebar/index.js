import React from "react";
import { Link, useHistory } from "react-router-dom";

import logo from "../../Images/logo.png";
import configs from "../../Images/configs.png";
import products from "../../Images/products.png";
import profile from "../../Images/profile.jpg";
import reports from "../../Images/reports.png";
import sales from "../../Images/sales.png";
import users from "../../Images/users.png";

import "../../Styles/Sidebar.css";

const Sidebar = () => {
  let history = useHistory();

  const getSalesmanName = () => {
    const username = localStorage.getItem("username");
    if (username) {
      return username.split(" ")[0];
    }
    return "";
  };

  const HandleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="pane-sm sidebar" id="sidebar">
      <div id="logo">
        <Link to="/newSale">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div id="links">
        <ul>
          <li>
            <Link to="/newSale">
              <div id="icon-sidebar">
                <img src={sales} alt="" />
              </div>
              <div id="text-sidebar">Nova Venda</div>
            </Link>
          </li>
          <li>
            <Link to="/clients">
              <div id="icon-sidebar">
                <img src={users} alt="" />
              </div>
              <div id="text-sidebar">Clientes</div>
            </Link>
          </li>
          <li>
            <Link to="/products">
              <div id="icon-sidebar">
                <img src={products} alt="" />
              </div>
              <div id="text-sidebar">Produtos</div>
            </Link>
          </li>
          <li>
            <Link to="/reports">
              <div id="icon-sidebar">
                <img src={reports} alt="reports icon" />
              </div>
              <div id="text-sidebar">Relatórios</div>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <div id="icon-sidebar">
                <img src={configs} alt="settings icon" />
              </div>
              <div id="text-sidebar">Configurações</div>
            </Link>
          </li>
        </ul>
      </div>
      <div id="user-informations">
        {/*         {
          <div id="profile-image">
            <img src={profile} alt="profile" />
          </div>
        } */}
        <div id="operator-name">{getSalesmanName()}</div>
        <div id="out-icon">
          <span
            className="icon icon-logout"
            onClick={() => HandleLogout()}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
