import React from "react";

const SingleScreenWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <main className="h-[calc(100vh-115px)] p-4">{children}</main>;
};

export default SingleScreenWrapper;
