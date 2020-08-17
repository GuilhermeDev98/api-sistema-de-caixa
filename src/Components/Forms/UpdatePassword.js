import React, { useState } from "react";
import Api from "Services/Api";
import swal from "sweetalert";

const UpdatePassword = () => {
  const [data, setData] = useState({});

  const HandleUpdatePassword = async (e) => {
    e.preventDefault();
    const validated = validateFields();

    if (validated) {
      try {
        const response = await Api.put("users/password", data);
        swal("", response.data.message, response.data.status);
      } catch (error) {
        const { message, status } = error.response.data;
        swal("", message, status);
      }
    }
  };

  const validateFields = () => {
    const { password, newPassword, confirmNewPassword } = data;

    if (!password || password === "") {
      swal("", "Campo Senha Atual é Obrigatório !", "error");
      return;
    }

    if (!newPassword || newPassword === "") {
      swal("", "Campo Nova Senha é Obrigatório !", "error");
      return;
    }

    if (!confirmNewPassword || confirmNewPassword === "") {
      swal("", "Campo Confirmação Da Nova Senha é Obrigatório !", "error");
      return;
    }

    const passwordLength = data?.newPassword.length;

    if (passwordLength < 6) {
      swal("", "Campo Nova Senha precisa ter 6 ou mais caracteres !", "error");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      swal(
        "",
        "Campo Nova Senha e Confirmação da Nova Senha precisam ser iguais !",
        "error"
      );
      return;
    }

    return true;
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="actual-password">Senha Atual</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          required
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="new-password">Nova Senha</label>
        <input
          type="password"
          id="newPassword"
          className="form-control"
          name="newPassword"
          required
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-new-password">Confirmação da Nova Senha</label>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          className="form-control"
          required
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
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
          className="btn btn-warning btn-large"
          onClick={(e) => HandleUpdatePassword(e)}
        >
          Alterar
        </button>
      </div>
    </form>
  );
};

export default UpdatePassword;
