import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* import { online } from "../src/Services/Network";
import iconOffline from "./Images/offline.png"; */

import "./Styles/Global.css";
import "./Styles/photon.min.css";

/* const ShowApp = () => {
  if (online()) {
    return <App />;
  } else {
    return (
      <div className="window">
        {online()}
        <div
          style={{
            background: "gainsboro",
            display: "flex",
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <img
              src={iconOffline}
              alt="Vocẽ Está Oflline!"
              width="150px"
              height="150px"
            />
          </div>
          <strong>
            <h1>
              Você está Oflline, Não é possível efetuar ou finalizar compras!
            </h1>
          </strong>
        </div>
      </div>
    );
  }
};
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
