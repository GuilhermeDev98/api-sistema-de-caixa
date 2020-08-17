import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import swal from "@sweetalert/with-react";
import Api from "Services/Api";

import SelectNumberOfInstallments from "../../Modals/SelectNumberOfInstallments";
import SaleConfirmation from "../../Modals/SaleConfirmation";
import SelectMethodOfPayment from "../../Modals/SelectMethodOfPayment";

import SearchProduct from "Components/Forms/SearchProduct";
import SearchClient from "Components/Forms/SearchClient";

import Dashboard from "../../Components/Dashboard";

const AddNewSale = () => {
  let { user_id } = useParams();
  let history = useHistory();

  const [Client, SetClient] = useState();
  const [Products, SetProducts] = useState([]);
  const [Total, SetTotal] = useState(0);
  const [PaymentMethod, SetPaymentMethod] = useState();
  const [PaymentMethodPT, SetPaymentMethodPT] = useState("Dinheiro");
  const [NumberOfInstallments, SetNumberOfInstallments] = useState();

  const showBoxSearchProduct = () => {
    swal({
      content: <SearchProduct SetProducts={SetProducts} ActualBag={Products} />,
      buttons: false,
    });
  };

  const showBoxSearchClient = () => {
    swal({
      content: <SearchClient SetClient={SetClient} />,
      buttons: false,
    });
  };

  const RenderButton = () => {
    if (Products.length >= 1) {
      if (!PaymentMethod) {
        return (
          <button
            className="btn btn-large btn-positive"
            onClick={() => selectMethodOfPayment()}
          >
            Forma de Pagamento
          </button>
        );
      }

      if (PaymentMethod === "CREDITCARD" && !NumberOfInstallments) {
        return (
          <div>
            <button
              className="btn btn-large btn-warning"
              onClick={() => selectMethodOfPayment()}
              style={{ marginRight: "5px" }}
            >
              Alterar Forma de Pagamento
            </button>
            <button
              className="btn btn-large btn-positive"
              onClick={() => HandleSelectMethodOfPayment()}
            >
              Escolher Número de Parcelas
            </button>
          </div>
        );
      }

      if (PaymentMethod) {
        return (
          <div>
            <button
              className="btn btn-large btn-warning"
              onClick={() => selectMethodOfPayment()}
              style={{ marginRight: "5px" }}
            >
              Alterar Forma de Pagamento
            </button>
            <button
              className="btn btn-large btn-positive"
              onClick={() => HandleReviseAndFinishSale()}
            >
              Revisar e Finalizar Venda
            </button>
          </div>
        );
      }
    }
  };

  const HandleReviseAndFinishSale = () => {
    return swal({
      content: (
        <SaleConfirmation
          Products={Products}
          Total={Total}
          PaymentMethodPT={PaymentMethodPT}
          NumberOfInstallments={NumberOfInstallments}
          HandleFinishSale={HandleFinishSale}
        />
      ),
      buttons: false,
    });
  };

  const HandleSelectMethodOfPayment = () => {
    if (PaymentMethod === "CREDITCARD") {
      return swal({
        content: (
          <SelectNumberOfInstallments
            SetNumberOfInstallments={SetNumberOfInstallments}
            HandleReviseAndFinishSale={HandleReviseAndFinishSale}
          />
        ),
      });
    } else {
    }
  };

  const selectMethodOfPayment = () => {
    return swal({
      content: (
        <SelectMethodOfPayment
          SetPaymentMethod={SetPaymentMethod}
          PaymentMethod={PaymentMethod}
          HandleSelectMethodOfPayment={HandleSelectMethodOfPayment}
        />
      ),
    });
  };

  const HandleFinishSale = async () => {
    const products = Products.map((product) => {
      return {
        product_id: product.id,
        amount: product.amount,
      };
    });

    const data = {
      payment_method: PaymentMethod,
      number_of_installments: NumberOfInstallments,
      user_id: Client ? Client.id : null,
      products,
    };

    if (Products.length <= 0) {
      swal({
        content: (
          <div className="text-center">
            <strong>
              Não é possivel finalizar a venda sem nenhum produto!
            </strong>
          </div>
        ),
        icon: "error",
      });
    } else {
      SendSaleToServer(data);
    }
  };

  const ResetSale = () => {
    SetClient();
    SetProducts([]);
    SetPaymentMethod();
    SetNumberOfInstallments();
    history.push("/newSale");
  };

  const HandleResetSale = () => {
    swal({
      title: "Tem certeza?",
      text: "Todos os itens do carrinho serão perdidos!",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        defeat: "Confirmar",
      },
      dangerMode: true,
    }).then(() => ResetSale());
  };

  const SendSaleToServer = async (data) => {
    try {
      await Api.post("sales", data);
      swal({
        content: (
          <div className="text-center">
            <strong>Venda Finalizada !</strong>
          </div>
        ),
        icon: "success",
      }).then(() => {
        ResetSale();
      });
    } catch (error) {
      swal({
        content: (
          <div className="text-center">
            <strong>Erro, Contacte o Programador !</strong>
          </div>
        ),
        icon: "error",
      });
    }
  };

  const incrementAmount = (ProductIndex) => {
    Products.map((product, index) => {
      if (ProductIndex === index) {
        product.amount = product.amount + 1;
      }
      return null;
    });
    return SetProducts([...Products]);
  };

  const decrmentAmount = (ProductIndex) => {
    if (Products[ProductIndex].amount <= 0) {
      return;
    }

    Products.map((product, index) => {
      if (ProductIndex === index) {
        product.amount = product.amount - 1;
        if (product.amount === 0) {
          HandleRemoveProductOfBag(ProductIndex);
        }
      }
      return null;
    });
    return SetProducts([...Products]);
  };

  const HandleRemoveProductOfBag = (ProductIndex) => {
    Products.splice(ProductIndex, 1);
    SetProducts([...Products]);
  };

  useEffect(() => {
    if (Products) {
      let ValueOfBag = 0;
      Products.map((product) => {
        const value = product.price * product.amount;
        ValueOfBag += value;
        return value;
      });
      SetTotal(Math.round(ValueOfBag * 100) / 100);
    }
  }, [Products]);

  useEffect(() => {
    if (PaymentMethod === "MONEY") {
      SetNumberOfInstallments();
      SetPaymentMethodPT("Dinheiro");
    }
    if (PaymentMethod === "CREDITCARD") {
      SetPaymentMethodPT("Cartão de Crédito");
    }
    if (PaymentMethod === "DEBITCARD") {
      SetPaymentMethodPT("Cartão de Débito");
    }
  }, [PaymentMethod]);

  useEffect(() => {
    if (user_id) {
      async function SearchUserInformations(user_id) {
        try {
          const { data } = await Api.get(`users/${user_id}`);
          SetClient(data);
        } catch (error) {
          swal("", "Erro, Contacte o Programador!", "error");
        }
      }
      SearchUserInformations(user_id);
    }
  }, []);

  return (
    <Dashboard>
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            Cliente: {Client ? Client.username : "Não Identificado"} - Total R${" "}
            {Total}
          </div>
          <div className="card-options">
            {Products && (
              <button
                className="btn btn-large btn-negative"
                onClick={HandleResetSale}
                style={{ marginRight: "2px" }}
              >
                <span className="icon icon-trash"></span>
              </button>
            )}
            <button
              className="btn btn-large btn-primary"
              style={{ marginRight: "2px" }}
              onClick={showBoxSearchClient}
            >
              <span className="icon icon-user"></span>
            </button>
            <button
              className="btn btn-large btn-primary"
              onClick={showBoxSearchProduct}
            >
              <span className="icon icon-box"></span>
            </button>
          </div>
        </div>
        <div className="card-body">
          <table className="table-striped">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Quantidade</th>
                <th className="text-center">
                  <span className="icon icon-cog"></span>
                </th>
              </tr>
            </thead>
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

                    <td>{product.price}</td>
                    <td className="text-center">
                      <span
                        className="icon icon-plus-circled"
                        style={{ fontSize: "20px", marginRight: "5px" }}
                        onClick={() => incrementAmount(index)}
                      ></span>
                      {product.amount}
                      <span
                        className="icon icon-minus-circled"
                        style={{ fontSize: "20px", marginLeft: "5px" }}
                        onClick={() => decrmentAmount(index)}
                      ></span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-negative"
                        onClick={() => HandleRemoveProductOfBag(index)}
                      >
                        <span className="icon icon-trash"></span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-right">{RenderButton()}</div>
      </div>
    </Dashboard>
  );
};

export default AddNewSale;
