import React, { useState } from "react";
import swal from "@sweetalert/with-react";
import { Link, useHistory } from "react-router-dom";

import Api from "../../Services/Api";

function AddNewProduct() {
  let history = useHistory();
  const [NewProduct, SetNewProduct] = useState(null);

  const HandleSubmitForm = async (e) => {
    e.preventDefault();
    if (NewProduct) {
      try {
        await Api.post("products", NewProduct);
        swal("", "Produto Criado Com Sucesso !", "success").then(() =>
          history.push("/products")
        );
      } catch (error) {
        swal("", "Erro Desconhecido, Contate o Programador !", "error");
      }
    } else {
      swal("", "Todos os campos com * são obrigatórios !", "error");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Novo Produto</div>
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
            <label>Nome *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Nome do Produto"
              required
              onChange={(e) =>
                SetNewProduct({
                  ...NewProduct,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Código de Barras *</label>
            <input
              type="number"
              name="barcode"
              className="form-control"
              placeholder="Código de Barras"
              required
              onChange={(e) =>
                SetNewProduct({
                  ...NewProduct,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Preço *</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Preço"
              required
              onChange={(e) =>
                SetNewProduct({
                  ...NewProduct,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Quantidade em Estoque *</label>
            <input
              type="number"
              name="stock"
              className="form-control"
              placeholder="Estoque"
              required
              onChange={(e) =>
                SetNewProduct({
                  ...NewProduct,
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
  );
}

export default AddNewProduct;
