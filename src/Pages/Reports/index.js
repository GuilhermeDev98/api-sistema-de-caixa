import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import Api from "Services/Api";
import Dashboard from "../../Components/Dashboard";
import swal from "sweetalert";

import "./reports.css";

const Reports = () => {
  const [TypeOfSale, SetTypeOfSale] = useState([]);
  const [Sales, SetSales] = useState();
  const [Salesmans, SetSalesmans] = useState();
  const [Query, SetQuery] = useState({
    payment_method: "MONEY",
    salesman_id: null,
    initial_day: "01",
    month: null,
    final_day: "30",
  });

  const getSales = async () => {
    try {
      const { data } = await Api.get("/reports", { params: { ...Query } });
      SetSales(data);
    } catch (error) {
      const { message, status } = error.response.data;
      swal("", message, status);
    }
  };

  const getSalesmans = async () => {
    const { data } = await Api.get("/users/all/salesman", { ...Query });
    SetSalesmans(data);
  };

  const HandleSearch = async (e) => {
    e.preventDefault();
    getSales();
  };

  useEffect(() => {
    getSales();
    getSalesmans();
    SetTypeOfSale([
      {
        value: "MONEY",
        valueInPt: "Dinheiro",
      },
      {
        value: "CREDITCARD",
        valueInPt: "Cartão de Crédito",
      },
      {
        value: "DEBITCARD",
        valueInPt: "Cartão de Débito",
      },
      {
        value: "CHECK",
        valueInPt: "Cheque",
      },
    ]);
  }, []);

  return (
    <Dashboard>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Relatórios</div>
        </div>
        <div className="card-body">
          <form
            className="form-query"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="form-group" style={{ flex: 2 }}>
              <select
                name="payment_method"
                className="form-control"
                onChange={(e) =>
                  SetQuery({ ...Query, [e.target.name]: e.target.value })
                }
              >
                <option value="MONEY">Selecione o Tipo de Venda</option>
                {TypeOfSale &&
                  TypeOfSale.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.valueInPt}
                    </option>
                  ))}
              </select>
            </div>
            <div
              className="form-group"
              style={{ flex: 2 }}
              onChange={(e) =>
                SetQuery({ ...Query, [e.target.name]: e.target.value })
              }
            >
              <select name="salesman_id" className="form-control">
                <option value={null}>Selecione o Vendedor</option>
                {Salesmans &&
                  Salesmans.map((salesman) => (
                    <option key={salesman.id} value={salesman.id}>
                      {salesman.username}
                    </option>
                  ))}
              </select>
            </div>
            <div
              className="form-group"
              style={{ flex: 2 }}
              onChange={(e) =>
                SetQuery({ ...Query, [e.target.name]: e.target.value })
              }
            >
              <select name="month" className="form-control">
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>
            <div
              className="form-group"
              style={{ flex: 1 }}
              onChange={(e) =>
                SetQuery({ ...Query, [e.target.name]: e.target.value })
              }
            >
              <input
                type="number"
                name="initial_day"
                value="01"
                className="form-control"
              />
            </div>
            <div
              className="form-group"
              style={{ flex: 1 }}
              onChange={(e) =>
                SetQuery({ ...Query, [e.target.name]: e.target.value })
              }
            >
              <input
                type="text"
                name="final_day"
                value="31"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-positive btn-large"
                onClick={(e) => HandleSearch(e)}
              >
                Buscar
              </button>
            </div>
          </form>
          <Chart
            width="100%"
            height={"300px"}
            chartType="AreaChart"
            loader={<div>Carregando Gráfico ...</div>}
            data={Sales}
            options={{
              title: "",
              hAxis: { title: "Dias", titleTextStyle: { color: "#333" } },
              vAxis: { minValue: 0 },
              // For the legend to fit, we make the chart area smaller
              chartArea: { width: "50%", height: "70%" },
              // lineWidth: 25
            }}
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default Reports;
