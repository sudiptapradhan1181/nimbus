"use client";

import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.accessToken) {
      try {
        const decoded = jwtDecode(cookies.accessToken);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid Token:", error);
      }
    }
  }, []);

  // Render only when the user state is set
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <span>Welcome {user.name}!</span>
      <a href="/canvas">Go to Canvas</a>
    </div>
  );
}
