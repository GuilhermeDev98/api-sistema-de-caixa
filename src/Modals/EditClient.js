import React, { useState } from "react";
import swal from "sweetalert";
import Api from "Services/Api";

const EditClient = ({ Client, history }) => {
  const [ClientUpdated, SetClientUpdated] = useState(Client);

  const HandleUpdateClient = async () => {
    try {
      await Api.put(`users/${Client.id}`, { ...ClientUpdated });
      swal({
        text: "Usuário atualizado com sucesso !",
        icon: "success",
      }).then(() => {
        history.go(0);
      });
    } catch (error) {
      swal({
        text: "Erro, contate o programador !",
        icon: "info",
      });
    }
  };
  return (
    <div>
      <form style={{ textAlign: "left" }}>
        <div className="form-group">
          <label>Nome Completo *</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Nome Completo"
            value={ClientUpdated.username}
            onChange={(e) =>
              SetClientUpdated({ ...Client, [e.target.name]: e.target.value })
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
            value={ClientUpdated.email}
            onChange={(e) =>
              SetClientUpdated({ ...Client, [e.target.name]: e.target.value })
            }
          />
        </div>
        {Client.status === "administrator" && (
          <div className="form-group">
            <label>Senha</label>
            <input
              type="text"
              name="password"
              className="form-control"
              placeholder="Senha"
              onChange={(e) =>
                SetClientUpdated({ ...Client, [e.target.name]: e.target.value })
              }
            />
          </div>
        )}
        <div className="form-group">
          <label>CPF *</label>
          <input
            type="number"
            name="cpf"
            className="form-control"
            placeholder="CPF"
            value={ClientUpdated.cpf}
            onChange={(e) =>
              SetClientUpdated({ ...Client, [e.target.name]: e.target.value })
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
            value={ClientUpdated.phone}
            onChange={(e) =>
              SetClientUpdated({ ...Client, [e.target.name]: e.target.value })
            }
          />
        </div>
        {Client.status === "admin" && (
          <div className="form-group">
            <label>Status</label>
            <select
              className="form-control"
              value={ClientUpdated.status}
              name="status"
              onChange={(e) =>
                SetClientUpdated({ ...Client, [e.target.name]: e.target.value })
              }
            >
              <option value="client">Cliente</option>
              <option value="salemam">Vendedor</option>
              <option value="administrator">Administrador</option>
            </select>
          </div>
        )}
      </form>
      <button
        type="submit"
        className="btn btn-large btn-primary"
        style={{ width: "100%" }}
        onClick={() => HandleUpdateClient()}
      >
        Editar
      </button>
    </div>
  );
};

export default EditClient;
