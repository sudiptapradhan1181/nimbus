"use client";
import { useState } from "react";
import { signUp, signIn, signInWithGoogle } from "@/lib/auth";
import CustomInput from "@/components/CustomInput";
import CustomCTA from "@/components/CustomCTA";

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
    <div className="text-white w-screen h-screen flex flex-col items-center justify-center gap-10 bg-black">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="font-bold text-[52px]">Sign Up for Free</h1>
        <h2 className="font-medium text-[30px]">
          We won't sell your data to anyone.
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <CustomInput
          label={"Email Address"}
          type={"email"}
          value={email}
          onChange={setEmail}
          placeholder={"Enter your email address"}
          iconUrl={"/icons/email.svg"}
          iconAlt={"email"}
        />
        <CustomInput
          label={"Password"}
          type={"password"}
          value={password}
          onChange={setPassword}
          placeholder={"Enter your password"}
          iconUrl={"/icons/password.svg"}
          iconAlt={"password"}
        />
        <CustomCTA
          text={"Sign Up"}
          onClick={handleSignUp}
          secondaryIconUrl={"/icons/login.svg"}
        />

        <div className="flex flex-row items-center justify-center gap-1 text-sm">
          <span>Already have an account?</span>
          <button
            onClick={handleSignIn}
            className="text-[#4F45E4] font-semibold cursor-pointer"
          >
            Sign In
          </button>
        </div>

        <CustomCTA
          text={"Sign In With Google"}
          onClick={handleGoogleSignIn}
          primaryIconUrl={"/icons/google.svg"}
          btnBg={"bg-[#111729]"}
        />
      </div>
    </div>
  );
};

export default AuthPage;
