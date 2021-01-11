import Head from "next/head";
import styles from "./layout.module.css";

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Personal Task Management</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/lumen/bootstrap.min.css"
        />
      </Head>
      <div className="container">{children}</div>
    </div>
  );
}

export default Layout;
