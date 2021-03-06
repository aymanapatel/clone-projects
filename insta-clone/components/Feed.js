import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();

  return (
    <main
      className={`grid grid-cols-1 mx-auto  
        md:grid-cols-2 md:max-w-3xl
        lg:grid-cols-3 lg:max-w-6xl 
        ${!session && "!grid-cols-1 !max-w-3xl"}`} // Center if session is nnot there. (RHS section is to be hidden)
    >
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>

      {session && (
        <>
          <section className="hidden xl:inline-grid md:col-span-1">
            <div className="fixed top-20">
              {/* Mini profile */}
              <MiniProfile />
              {/* Suggestions */}
              <Suggestions />
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Feed;
