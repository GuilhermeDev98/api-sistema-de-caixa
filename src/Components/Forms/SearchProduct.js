import React, { useState } from "react";
import Api from "Services/Api";
import swal from "sweetalert";

const SearchProduct = ({ SetProducts, ActualBag }) => {
  const [sacola, setSacola] = useState([]);
  const [Search, SetSearch] = useState();

  const searchProduct = async (product) => {
    if (product.length >= 1) {
      try {
        const { data } = await Api.get(`products/search/${product}`);
        SetSearch(data);
      } catch (error) {
        swal("", "Erro, Contacte o Programador !", Error);
      }
    }
  };

  const HandleSelectProduct = (product) => {
    product["amount"] = 1;
    const data = [...sacola, ...ActualBag, product];
    setSacola(data);
    SetProducts(data);
  };

  return (
    <div className="wrapper">
      <form>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Nome ou Código do Produto"
            required
            autoComplete="off"
            onChange={(e) => {
              searchProduct(e.target.value);
            }}
          />
        </div>
      </form>
      <ul className="list-group">
        {Search &&
          Search.map((product) => (
            <li
              className="list-group-item"
              onClick={() => HandleSelectProduct(product)}
              key={product.id}
            >
              <img
                className="img-rounded media-object pull-left"
                src={product.photo}
                width="50"
                height="50"
                alt=""
              />
              <div className="media-body">
                <strong>{product.name}</strong>
                <p>{product.price}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchProduct;
