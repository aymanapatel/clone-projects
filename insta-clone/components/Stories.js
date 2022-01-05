import React, { useEffect, useState } from "react";
import { generateUrlForDiceBar } from "../utils/utility";
import faker from "faker";

import Story from "./Story";

import { useSession } from "next-auth/react";

function Stories() {
  const { data: session } = useSession();

  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const fakerSuggestions = [...Array(20)].map((_, i) => {
      const fakerObject = faker.helpers.contextualCard();
      const imageUrl = generateUrlForDiceBar(fakerObject["username"]);
      fakerObject["avatar"] = imageUrl;
      return {
        ...fakerObject,
        id: i,
      };
    });

    setSuggestions(fakerSuggestions);
  }, []);
  return (
    <div
      className="flex space-x-2 p-6 overflow-x-scroll
        bg-white border-gray-200 border rounded-sm
          scrollbar-thin scrollbar-thumb-black"
    >
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
