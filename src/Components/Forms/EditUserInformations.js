import React, { useState } from "react";
import Api from "Services/Api";
import swal from "sweetalert";

const EditUserInformations = ({ user, getUser }) => {
  const [userUpdate, setUserUpdate] = useState(user);

  const HandleUpdateUser = async (e) => {
    e.preventDefault();

    Api.put(`users/${user.id}`, userUpdate)
      .then(() => {
        swal("", "Informações editadas com sucesso !", "success");
        getUser();
      })
      .catch((err) => {
        const { message } = err.response.data.error;
        swal("", `${message}`, "error");
      });
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="username">Nome Completo</label>
        <input
          type="text"
          id="username"
          className="form-control"
          name="username"
          defaultValue={user.username}
          onChange={(e) =>
            setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value })
          }
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          defaultValue={user.email}
          onChange={(e) =>
            setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value })
          }
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Telefone</label>
        <input
          type="number"
          id="phone"
          name="phone"
          className="form-control"
          defaultValue={user.phone}
          onChange={(e) =>
            setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value })
          }
          required
        />
      </div>
      <div
        style={{
          textAlign: "right",
          padding: "5px",
        }}
      >
        <button
          type="submit"
          className="btn btn-positive btn-large"
          onClick={(e) => HandleUpdateUser(e)}
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default EditUserInformations;
