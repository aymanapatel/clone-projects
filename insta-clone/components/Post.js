import React from "react";

import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
function Post({ userName, image, caption }) {
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
          src={image}
          className="rounded-full h-12 w-12
            object-contain border p-1 mr-3"
          alt="Profile picture"
        />

        <p className="flex-1 font-bold">{userName}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* Image */}

      <img src={image} className="object-cover w-full" alt="Image picture" />
      {/* Buttons */}
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>
      {/* Caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{userName}</span>
        {caption}
      </p>
      {/* Commments */}
      {/* Input box */}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          type="text"
          placeholder="Add a comment!"
          className="border-none focus:ring-0 flex-1 outline-none"
        />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  );
}

export default Post;
