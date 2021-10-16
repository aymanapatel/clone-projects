import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*  Header*/}
      <Header />
      {/* Feed/Hero */}
      <Feed />
      {/* Modal */}
    </div>
  );
}
