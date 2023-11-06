import React from "react";

const Page = ({ children }) => {
  return (
    <main>
      <div className="p-6 h-screen">{children}</div>
    </main>
  );
};

export default Page;
