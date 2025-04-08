"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Landing from "./Landing";
import { usePathname } from "next/navigation";

function Homepage() {
  const { data: session, status } = useSession();
  const path = usePathname();

  if (path === "/Dashboard") {
    return null;
  }

  return <Landing />;
}

export default Homepage;
