import React from "react";
import swal from "@sweetalert/with-react";
import { useHistory } from "react-router-dom";
import ShowClient from "../ShowClient/index";
import EditClient from "../../Modals/EditClient";
import Api from "Services/Api";

const ClientRow = ({ client }) => {
  let history = useHistory();

  const HandleShowClient = (Client) => {
    swal({
      content: <ShowClient Client={Client} />,
      buttons: false,
    });
  };

  const HandleEditClient = (client) => {
    swal({
      content: <EditClient Client={client} history={history} />,
      buttons: false,
    });
  };

  const DeleteClient = () => {
    swal({
      title: "Tem Certeza?",
      text: "Todos os Dados dos usuários serão apagados !",
      icon: "warning",
      buttons: ["Cancelar", "Apagar"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await Api.delete(`users/${client.id}`);

          swal("Usuário deletado com sucesso !", {
            icon: "success",
          }).then(() => {
            history.go();
          });
        } catch (error) {
          swal("Erro, contate o programador !", {
            icon: "error",
          });
        }
      } else {
        swal.close();
      }
    });
  };

  return (
    <tr>
      <td>{client.username}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td className="text-center">
        <button
          className="btn btn-sm btn-positive"
          onClick={() => history.push(`/newSale/${client.id}`)}
        >
          <span className="icon icon-credit-card"></span>
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => HandleShowClient(client)}
        >
          <span className="icon icon-eye"></span>
        </button>
        <button
          className="btn btn-sm btn-warning"
          onClick={() => HandleEditClient(client)}
        >
          <span className="icon icon-pencil"></span>
        </button>
        <button className="btn btn-sm btn-negative" onClick={DeleteClient}>
          <span className="icon icon-trash"></span>
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
