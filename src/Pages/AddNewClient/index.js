import React, { useState } from "react";
import swal from "@sweetalert/with-react";
import { Link, useHistory } from "react-router-dom";

import Api from "../../Services/Api";

import Dashboard from "../../Components/Dashboard";

function AddNewClient() {
  let history = useHistory();
  const [NewClient, SetNewClient] = useState(null);

  const HandleSubmitForm = async (e) => {
    e.preventDefault();
    if (NewClient) {
      try {
        await Api.post("users", NewClient);
        swal("", "Cliente Criado Com Sucesso !", "success").then(() =>
          history.push("/clients")
        );
      } catch (error) {
        swal("", "Erro Desconhecido, Contate o Programador !", "error");
      }
    } else {
      swal("", "Todos os campos com * são obrigatórios !", "error");
    }
  };

  return (
    <Dashboard>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Novo Cliente</div>
          <div className="card-options">
            <Link to="/client">
              <button className="btn btn-large btn-primary">
                <span className="icon icon-left-open"></span>
              </button>
            </Link>
          </div>
        </div>
        <div className="card-body">
          <form style={{ textAlign: "left" }}>
            <div className="form-group">
              <label>Nome Completo *</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Nome Completo"
                required
                onChange={(e) =>
                  SetNewClient({
                    ...NewClient,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>E-Mail *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="E-Mail"
                required
                onChange={(e) =>
                  SetNewClient({
                    ...NewClient,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>CPF *</label>
              <input
                type="number"
                name="cpf"
                className="form-control"
                placeholder="CPF"
                required
                onChange={(e) =>
                  SetNewClient({
                    ...NewClient,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Celular</label>
              <input
                type="number"
                name="phone"
                className="form-control"
                placeholder="Celular"
                onChange={(e) =>
                  SetNewClient({
                    ...NewClient,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="btn btn-large btn-primary"
                onClick={HandleSubmitForm}
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}

export default AddNewClient;
