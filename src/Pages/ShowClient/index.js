import React from "react";

const ShowClient = ({ Client }) => {
  const ShowStatusClientInPt = (Client) => {
    switch (Client) {
      case "client":
        return "Cliente";
      case "salesmam":
        return "Vendedor";
      case "admin":
        return "Administrador";
      case "programmer":
        return "Programador";
      default:
        break;
    }
  };

  return (
    <div>
      Nome : <strong>{Client.username}</strong>
      <br />
      Email : <strong>{Client.email}</strong>
      <br />
      CPF : <strong>{Client.cpf}</strong>
      <br />
      Telfone : <strong>{Client.phone}</strong>
      <br />
      Status : <strong>{ShowStatusClientInPt(Client.status)}</strong>
      <br />
    </div>
  );
};

export default ShowClient;
