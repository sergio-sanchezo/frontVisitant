import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useAuth from "./AuthContext";

// import useAuth from "../../auth/AuthContext";

const ProtectRoutes = (props: any) => {
  const router = useRouter();
  const { children } = props;
  const { startChecking, authenticated, loading } = useAuth();
  useEffect(() => {
    startChecking();
    if (!authenticated) {
      router.push("/auth_screen");
    } else {
      router.push("/");
    }
  }, []);
  return loading && router.pathname !== "/auth_screen" ? (
    <></>
  ) : (
    <>{children}</>
  );
};

export default ProtectRoutes;
