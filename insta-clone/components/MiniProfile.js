import React from "react";

function MiniProfile() {
  return (
    <div
      className="flex justify-between items-center
               mt-14 ml-10 
    "
    >
      <img
        src="https://links.papareact.com/3ke"
        className="rounded-full h-16 w-16
                    border p-[2px]"
        alt="Profile picture"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">Something</h2>
        <h3 className="text-sm text-gray-400">
          {" "}
          Welcome to the one and onlyccx{" "}
        </h3>
      </div>
      <button className="text-blue-400 text-sm font-semibold">Sign out</button>
    </div>
  );
}

export default MiniProfile;
