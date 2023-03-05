import React from "react";
import Navbar from "./Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto h-screen mt-2">{children}</div>
    </>
  );
}
