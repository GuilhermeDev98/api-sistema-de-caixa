import React from "react";

const ShowProduct = ({ Product }) => {
  return (
    <div>
      {Product.photo && <img src={Product.photo} alt={Product.name} />}
      <br />
      Nome : <strong>{Product.name}</strong>
      <br />
      Código : <strong>{Product.barcode}</strong>
      <br />
      Preço : <strong>{Product.price}</strong>
      <br />
      Estoque : <strong>{Product.stock}</strong>
      <br />
    </div>
  );
};

export default ShowProduct;
