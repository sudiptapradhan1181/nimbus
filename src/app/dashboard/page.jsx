"use client";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const cookies = parseCookies();
  const data = jwtDecode(cookies.accessToken);
  console.log(data);
  return <div>Welcome {data.name}!</div>;
}
