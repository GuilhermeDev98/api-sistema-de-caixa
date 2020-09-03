import React from "react";
import swal from "@sweetalert/with-react";
import ShowProduct from "Pages/ShowProduct";
import EditProduct from "Modals/EditProduct";
import { useHistory } from "react-router-dom";
import Api from "../../Services/Api";

const ClientRow = ({ product }) => {
  let history = useHistory();

  const HandleShowProduct = (product) => {
    swal({
      content: <ShowProduct Product={product} />,
      buttons: false,
    });
  };

  const HandleEditProduct = (product) => {
    swal({
      content: <EditProduct Product={product} history={history} />,
      buttons: false,
    });
  };

  const showProductImage = (product) => {
    if (product.image) {
      return (
        <img
          src={product.photo}
          alt={product.name}
          width="50px"
          height="30px"
        />
      );
    } else {
      return "Sem Foto";
    }
  };

  const HandleDeleteClient = () => {
    swal({
      title: "Tem Certeza?",
      text: "Todos os Dados do Produto serão apagados !",
      icon: "warning",
      buttons: ["Cancelar", "Apagar"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await Api.delete(`products/${product.id}`);

          swal("Produto deletado com sucesso !", {
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
      <td className="text-center">{showProductImage(product)}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.stock}</td>
      <td className="text-center">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => HandleShowProduct(product)}
        >
          <span className="icon icon-eye"></span>
        </button>
        <button
          className="btn btn-sm btn-warning"
          onClick={() => HandleEditProduct(product)}
        >
          <span className="icon icon-pencil"></span>
        </button>
        <button
          className="btn btn-sm btn-negative"
          onClick={() => HandleDeleteClient()}
        >
          <span className="icon icon-trash"></span>
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
