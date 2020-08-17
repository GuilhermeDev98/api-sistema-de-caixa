import React, { useState, useEffect } from "react";
import Api from "../../Services/Api";
import Dashboard from "../../Components/Dashboard";

import ClientRow from "./ClientRow";
import { Link } from "react-router-dom";

function ListClientes() {
  const [Clients, SetClients] = useState([]);

  useEffect(() => {
    Api.get("/users").then(({ data }) => {
      SetClients(data);
    });
  }, []);

  return (
    <Dashboard>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Lista de Clientes</div>
          <div className="card-options">
            <Link to="/newClient">
              <button className="btn btn-large btn-primary">
                <span className="icon icon-plus"></span>
              </button>
            </Link>
          </div>
        </div>
        <div className="card-body-table">
          <table className="table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-Mail</th>
                <th>Celular</th>
                <th className="text-center">
                  <span className="icon icon-cog"></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {Clients &&
                Clients.map((client) => (
                  <ClientRow client={client} key={client.id} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Dashboard>
  );
}

export default ListClientes;
