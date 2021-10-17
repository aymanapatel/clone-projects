import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import Post from "./Post";

// const posts = [
//   {
//     id: "132",
//     userName: "John Doe",
//     image: "https://links.papareact.com/3ke",
//     caption: "Like, share and subscribe",
//   },
//   {
//     id: "112",
//     userName: "Mike Smith",
//     image: "https://links.papareact.com/3ke",
//     caption: "Like, share and subscribe",
//   },
// ];
function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    // cleanup
    return unsubscribe;
  }, [db]);
  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.data().username}
          profileImage={post.data().profileImg}
          postImage={post.data().image}
          caption={post.caption}
        />
      ))}
      {/*   
        {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          image={post.image}
          caption={post.caption}
        />
      ))}

   */}
    </div>
  );
}

export default Posts;
