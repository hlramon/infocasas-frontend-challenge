import Head from "next/head";

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Personal Task Management</title>
      </Head>
      {children}
    </div>
  );
}

export default Layout;
