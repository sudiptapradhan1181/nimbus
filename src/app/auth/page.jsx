"use client";
import { useState } from "react";
import { signInWithGoogle } from "@/lib/auth";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isSSOLoading, setIsSSOLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSSOLoading(true);
    try {
      const user = await signInWithGoogle();
      alert(`Signed in as ${user.displayName}`);
      setIsSSOLoading(false);
    } catch (error) {
      alert("Sign-in failed: " + error.message);
      setIsSSOLoading(false);
    }
  };

  const handleToggleSignUp = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setShowPassword(false);
    setIsSSOLoading(false);
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="relative text-white w-screen h-screen flex flex-col items-center justify-center gap-10 bg-black">
      {/* <div className="absolute bottom-0 left-0 w-[300px] h-[300px]">
        <img
          className="w-full h-full"
          src="/animations/auth.gif"
          alt="animation"
        />
      </div> */}
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="font-bold text-[52px]">Sign Up for Free</h1>
        <h2 className="font-medium text-[30px]">
          We won't sell your data to anyone.
        </h2>
      </div>
      {isSignUp ? (
        <SignUp
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          toggleSignUp={handleToggleSignUp}
          handleGoogleSignIn={handleGoogleSignIn}
          isSSOLoading={isSSOLoading}
        />
      ) : (
        <SignIn
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          toggleSignUp={handleToggleSignUp}
          handleGoogleSignIn={handleGoogleSignIn}
          isSSOLoading={isSSOLoading}
        />
      )}
    </div>
  );
};

export default AuthPage;
