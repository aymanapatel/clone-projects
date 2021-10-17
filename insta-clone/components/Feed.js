import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";

function Feed() {
  return (
    <main
      className="grid grid-cols-1 mx-auto  
        md:grid-cols-2 md:max-w-3xl
        lg:grid-cols-3 lg:max-w-6xl"
    >
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>

      <section className="col-span-1">
        {/* Mini profile */}
        {/* Suggestions */}
      </section>
    </main>
  );
}

export default Feed;
