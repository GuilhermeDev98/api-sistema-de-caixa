import React, { useState } from "react";
import swal from "sweetalert";
import Api from "Services/Api";

const EditProduct = ({ Product, history }) => {
  const [ProductUpdated, SetProductUpdated] = useState(Product);

  const HandleUpdateProduct = async () => {
    try {
      await Api.put(`products/${Product.id}`, { ...ProductUpdated });
      swal({
        text: "Produto atualizado com sucesso !",
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
          <label>Nome</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Nome Do Produto"
            value={ProductUpdated.name}
            onChange={(e) =>
              SetProductUpdated({ ...Product, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Preço</label>
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Preço"
            value={ProductUpdated.price}
            onChange={(e) =>
              SetProductUpdated({ ...Product, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Código de Barras</label>
          <input
            type="text"
            name="barcode"
            className="form-control"
            placeholder="Código de Barras"
            value={ProductUpdated.barcode}
            onChange={(e) =>
              SetProductUpdated({ ...Product, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Quantidade em Estoque</label>
          <input
            type="text"
            name="stock"
            className="form-control"
            placeholder="Estoque"
            value={ProductUpdated.stock}
            onChange={(e) =>
              SetProductUpdated({ ...Product, [e.target.name]: e.target.value })
            }
          />
        </div>
      </form>
      <button
        type="submit"
        className="btn btn-large btn-primary"
        style={{ width: "100%" }}
        onClick={() => HandleUpdateProduct()}
      >
        Editar
      </button>
    </div>
  );
};

export default EditProduct;
