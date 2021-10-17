import React, { useEffect, useState } from "react";
import faker from "faker";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const fakerSuggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(fakerSuggestions);
  }, []);
  return (
    <div className="mt-14 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm text-gray-600   fomt-bold">
          Suggestions for you
        </h3>
        <button className="text-gray-500 font-semibold">See All</button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3 "
        >
          <img
            className="h-10 w-10 rounded-full p-[2px] border"
            src={profile.avatar}
            alt="Suggestions avatar"
          />
          <div className="flex-1 ml-4">
            <h2 className="text-sm font-semibold">{profile.username}</h2>
            <h3> Works at {profile.company.name}</h3>
          </div>
          <button className="text-blue-400 font-sm">Follow</button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
