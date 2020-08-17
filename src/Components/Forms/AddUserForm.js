import React from "react";

const AddUserForm = ({ SetNewClient }) => {
  return (
    <form style={{ textAlign: "left" }}>
      <div className="form-group">
        <label>Nome Completo</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nome Completo"
          required
          onChange={SetNewClient()}
        />
      </div>
      <div className="form-group">
        <label>E-Mail</label>
        <input type="email" className="form-control" placeholder="E-Mail" />
      </div>
      <div className="form-group">
        <label>CPF</label>
        <input type="number" className="form-control" placeholder="CPF" />
      </div>
      <div className="form-group">
        <label>Celular</label>
        <input type="number" className="form-control" placeholder="Celular" />
      </div>
    </form>
  );
};

export default AddUserForm;
