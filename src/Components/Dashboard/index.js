import React from "react";
import Sidebar from "../Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div className="window">
      <div className="window-content">
        <div className="pane-group" style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: "6" }}>{children}</div>
        </div>
      </div>
      <footer className="toolbar toolbar-footer">
        <h1 className="title">Desenvolvido por Guilherme Santos</h1>
      </footer>
    </div>
  );
};

export default Dashboard;
