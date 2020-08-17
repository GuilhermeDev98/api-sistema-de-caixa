import React from "react";
import Sidebar from "../Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div className="window">
      <div className="window-content">
        <div className="pane-group">
          <Sidebar />
          <div className="pane">{children}</div>
        </div>
      </div>
      <footer className="toolbar toolbar-footer">
        <h1 className="title">Desenvolvido por Guilherme Santos</h1>
      </footer>
    </div>
  );
};

export default Dashboard;
