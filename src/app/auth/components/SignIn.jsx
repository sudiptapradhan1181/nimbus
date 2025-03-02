"use client";
import CustomInput from "@/components/CustomInput";
import CustomCTA from "@/components/CustomCTA";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  toggleSignUp,
  handleGoogleSignIn,
  isSSOLoading,
}) {
  const router = useRouter();
  const [isCTALoading, setIsCTALoading] = useState(false);
  const handleSignIn = async () => {
    setIsCTALoading(true);
    try {
      const user = await signIn(email, password);
      setIsCTALoading(false);
      router.replace("/dashboard");
    } catch (error) {
      setIsCTALoading(false);
      alert("Sign-in failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <CustomInput
        label={"Email Address"}
        type={"email"}
        value={email}
        onChange={setEmail}
        placeholder={"Enter your email address"}
        iconUrl={"/icons/email.svg"}
      />
      <CustomInput
        label={"Password"}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={setPassword}
        placeholder={"Enter your password"}
        iconUrl={"/icons/password.svg"}
        rightIconUrl={showPassword ? "/icons/eyeOff.svg" : "/icons/eye.svg"}
        rightIconClick={() => setShowPassword(!showPassword)}
      />
      <CustomCTA
        text={"Sign In"}
        handleClick={handleSignIn}
        isLoading={isCTALoading}
        secondaryIconUrl={"/icons/login.svg"}
      />

      <div className="flex flex-row items-center justify-center gap-1 text-sm">
        <span>Don't have an account?</span>
        <button
          onClick={toggleSignUp}
          className="text-[#4F45E4] font-semibold cursor-pointer"
        >
          Sign Up
        </button>
      </div>

      <CustomCTA
        text={"Sign In With Google"}
        handleClick={handleGoogleSignIn}
        primaryIconUrl={"/icons/google.svg"}
        btnBg={"bg-[#111729]"}
        isLoading={isSSOLoading}
      />
    </div>
  );
}
