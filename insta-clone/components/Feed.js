import React from "react";
import Stories from "./Stories";

function Feed() {
  return (
    <main
      className="grid grid-cols-1 max-auto 
        md:grid-cols-2 md:max-w-3xl
        lg:grid-cols-3 lg:max-w-6xl"
    >
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Post */}
      </section>

      <section className="col-span-1">
        {/* Mini profile */}
        {/* Suggestions */}
      </section>
    </main>
  );
}

export default Feed;
