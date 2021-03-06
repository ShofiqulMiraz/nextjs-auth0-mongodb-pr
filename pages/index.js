import Head from "next/head";
import Navbar from "../components/Navbar";
import auth0 from "../utils/auth0";

export default function Home({ user }) {
  return (
    <>
      <Head>
        <title>Next Js Auth0 Mongodb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />

      <p>hello next js</p>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  if (typeof window === "undefined") {
    const session = await auth0.getSession(req);
    const user = session?.user || null;

    return {
      props: {
        user,
      },
    };
  }
}
