import React from "react";

export default function Layout({ Component }) {
  return (
    <div className="container mx-auto">
      <Component />
    </div>
  );
}
