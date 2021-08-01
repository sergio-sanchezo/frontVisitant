import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }: any) => {
  return (
    <div className="mainLayout">
      <NavBar />
      <div
        className="layout-content"
        /* style={{ width: "100%", minHeight: "100vh", justifyContent: "center" }} */
      >
        {children}
      </div>
      <footer className="footer">
        <div className="info">
          <p>Universidad Nacional De Colombia</p>
          <p>Bases de Datos, 2021 - 1</p>
        </div>
      </footer>
    </div>
  );
};

export default React.memo(Layout);
