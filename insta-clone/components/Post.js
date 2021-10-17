import React, { useState, useEffect } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

import {
  addDoc,
  collection,
  deleteDoc,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";

import { onSnapshot, doc, query } from "@firebase/firestore";
import { db } from "../firebase";

function Post({ id, userName, profileImage, postImage, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  // useEffect(() => {
  //   const temp = query(
  //     collection(db, "posts", id, "comments"),
  //     orderBy("timestamp", "desc")
  //   );

  //   const temp1 = query()
  //   return temp;
  // }, [db]);

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")),
  //       (snapshot) => {
  //         setPosts(snapshot.docs);
  //       }
  //     ),
  //   [db]
  // );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const addComment = async (event) => {
    event.preventDefault();

    const addCommentToFirestore = comment;
    setComment("");

    addDoc(collection(db, "posts", id, "comments"), {
      comment: addCommentToFirestore,
      username: session.user.username,
      userImage: session.user.image,
      timeStamp: serverTimestamp(),
    });
  };

  return (
    <div
      className="border bg-white
    rounded-sm my-7"
    >
      {/* Header */}
      <div
        className="flex items-center p-5 
            "
      >
        <img
          src={profileImage}
          className="rounded-full h-12 w-12
            object-contain border p-1 mr-3"
          alt="Profile picture"
        />

        <p className="flex-1 font-bold">{userName}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* Image */}

      <img
        src={postImage}
        className="object-cover w-full"
        alt="Image picture"
      />
      {/* Buttons */}
      {session && (
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{userName}</span>
        {caption}
      </p>

      {/* Commments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div className="flex items-center space-x-2 mb-3" key={comment.id}>
              <img
                src={comment.data().userImage}
                className="h-7 rounded-full"
                alt=""
              />
            </div>
          ))}
        </div>
      )}
      {/* Input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Add a comment!"
            className="border-none focus:ring-0 flex-1 outline-none"
          />
          <button
            type="submit"
            // disabled={!comment.trim()}
            onClick={addComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
