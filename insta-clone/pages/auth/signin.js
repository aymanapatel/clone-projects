import React, { Fragment } from "react";
import Header from "../../components/Header";

import { getProviders, signIn as SignInAsProvider } from "next-auth/react";
// Function Name: camelCase
// File Name: lowercase
function signIn({ providers }) {
  return (
    <Fragment>
      <Header />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => SignInAsProvider(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </Fragment>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn;
