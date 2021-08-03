import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useAuth from "./AuthContext";

// import useAuth from "../../auth/AuthContext";

const ProtectRoutes = (props: any) => {
  const router = useRouter();
  const { children } = props;
  const { startChecking, loading, session } = useAuth();
  useEffect(() => {
    startChecking();
    if (!session) {
      router.push("/auth_screen");
    }
  }, []);
  return loading && router.pathname !== "/auth_screen" ? (
    <></>
  ) : (
    <>{children}</>
  );
};

export default ProtectRoutes;
