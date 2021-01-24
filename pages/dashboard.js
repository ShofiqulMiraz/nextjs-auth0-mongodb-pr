import Head from "next/head";
import Navbar from "../components/Navbar";
import auth0 from "../utils/auth0";

export default function Dashboard({ user }) {
  return (
    <>
      <Head>
        <title> {user.nickname}'s Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      <div className="container">
        <p> {user.name} </p>
        <p> {user.nickname} </p>
        <p> {user.sub} </p>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  // get user from session
  if (typeof window === "undefined") {
    const session = await auth0.getSession(req);
    const user = session?.user || null;

    if (!user) {
      return {
        redirect: {
          destination: "/api/login",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user,
      },
    };
  }
}
