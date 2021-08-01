import { Button } from "antd";
import React from "react";
import useAuth from "../auth/AuthContext";

const NavBar = () => {
  const { logout } = useAuth();
  return (
    <div className="navContainer">
      <p>RBIC</p>
      <Button type="primary" onClick={logout}>
        Salir
      </Button>
    </div>
  );
};

export default React.memo(NavBar);
