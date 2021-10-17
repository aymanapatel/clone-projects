import React from "react";
import Post from "./Post";

const posts = [
  {
    id: "132",
    userName: "John Doe",
    image: "https://links.papareact.com/3ke",
    caption: "Like, share and subscribe",
  },
  {
    id: "112",
    userName: "Mike Smith",
    image: "https://links.papareact.com/3ke",
    caption: "Like, share and subscribe",
  },
];
function Posts() {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          image={post.image}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default Posts;
