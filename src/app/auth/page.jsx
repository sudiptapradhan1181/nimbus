"use client";
import { useState } from "react";
import { signUp, signIn, signInWithGoogle } from "@/lib/auth";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const user = await signUp(email, password);
      alert("Sign-up successful!");
    } catch (error) {
      alert("Sign-up failed: " + error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const user = await signIn(email, password);
      alert("Sign-in successful!");
    } catch (error) {
      alert("Sign-in failed: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      alert(`Signed in as ${user.displayName}`);
    } catch (error) {
      alert("Sign-in failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h2>Authentication</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>

      <div style={{ padding: "20px" }}>
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      </div>
    </div>
  );
};

export default AuthPage;
