import React, { Fragment } from "react";
import Header from "../../components/Header";

import { getProviders, signIn as SignInAsProvider } from "next-auth/react";
// Function Name: camelCase
// File Name: lowercase
function signIn({ providers }) {
  return (
    <>
      <Header />

      <div
        className=" min-h-screen flex flex-col items-center text-center justify-center 
          py-2 px-14"
      >
        <img
          className="w-80"
          src="https://links.papareact.com/ocw"
          alt="Logo Singin page"
        />
        <p className="font-xs italic">Instagram Clone App</p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() =>
                  SignInAsProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
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
