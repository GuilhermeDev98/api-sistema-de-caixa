import React from "react";

const SelectMethodOfPayment = ({
  PaymentMethod,
  SetPaymentMethod,
  HandleSelectMethodOfPayment,
}) => {
  return (
    <div>
      <strong>Selecione a forma de pagamento:</strong>
      <form>
        <div className="form-group">
          <div className="checkbox">
            <label style={{ marginRight: "2px" }}>
              <input
                value="MONEY"
                name="payment_method"
                type="radio"
                onClick={(e) => SetPaymentMethod(e.target.value)}
              />
              A Vista
            </label>
            <label style={{ marginRight: "2px" }}>
              <input
                value="CREDITCARD"
                name="payment_method"
                type="radio"
                onClick={(e) => SetPaymentMethod(e.target.value)}
              />
              Cartão de Crédito
            </label>
            <label style={{ marginRight: "2px" }}>
              <input
                value="DEBITCARD"
                name="payment_method"
                type="radio"
                onClick={(e) => SetPaymentMethod(e.target.value)}
              />
              Cartão de Débito
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SelectMethodOfPayment;
