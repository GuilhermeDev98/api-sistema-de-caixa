import React, { useState, useEffect } from "react";
import Api from "../../Services/Api";
import { Link } from "react-router-dom";
import Dashboard from "../../Components/Dashboard";

import ProductRow from "./ProductRow";

function ListProducts() {
  const [Products, SetProducts] = useState([]);

  useEffect(() => {
    Api.get("/products").then(({ data }) => {
      SetProducts(data);
    });
  }, []);

  return (
    <Dashboard>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Lista de Produtos</div>
          <div className="card-options">
            <Link to="/newProduct">
              <button className="btn btn-large btn-primary">
                <span className="icon icon-plus"></span>
              </button>
            </Link>
          </div>
        </div>
        <div className="card-body-table">
          <table className="table-striped">
            <thead>
              <tr>
                <th className="text-center">Imagem</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Estoque</th>
                <th className="text-center">
                  <span className="icon icon-cog"></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {Products &&
                Products.map((product) => (
                  <ProductRow product={product} key={product.id} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Dashboard>
  );
}

export default ListProducts;
