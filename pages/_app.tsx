import "antd/dist/antd.css";
import "../styles/styles.scss";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../auth/AuthContext";
import ProtectRoutes from "../auth/ProtectRoutes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ProtectRoutes>
        <Component {...pageProps} />
      </ProtectRoutes>
    </AuthContextProvider>
  );
}
export default MyApp;
