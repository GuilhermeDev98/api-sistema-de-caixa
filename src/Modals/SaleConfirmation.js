import React from "react";

const SaleConfirmation = ({
  Products,
  Total,
  PaymentMethodPT,
  NumberOfInstallments,
  HandleFinishSale,
}) => {
  return (
    <div>
      <h1>Confirmação de Venda</h1>
      <table className="table-striped">
        <tbody>
          {Products &&
            Products.map((product, index) => (
              <tr key={index}>
                <td className="text-center">
                  <img
                    src={product.photo}
                    alt={product.name}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{product.name}</td>

                <td className="text-center">{product.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="text-left" style={{ marginTop: "10px" }}>
        <strong>Subtotal: {Total}</strong> <br />
        <strong>Total: {Total}</strong> <br /> <br />
        <strong>Forma de Pagamento: {PaymentMethodPT}</strong>
        <br />
        {NumberOfInstallments && (
          <strong>Parcelado em : {NumberOfInstallments}X</strong>
        )}
      </div>
      <div>
        <button
          className="btn btn-large btn-primary"
          style={{ marginTop: "10px", width: "100%" }}
          onClick={() => HandleFinishSale()}
        >
          CONFIRMAR VENDA
        </button>
      </div>
    </div>
  );
};

export default SaleConfirmation;
