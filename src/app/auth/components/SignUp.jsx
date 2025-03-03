import CustomInput from "@/components/CustomInput";
import CustomCTA from "@/components/CustomCTA";
import { signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp({
  username,
  setUsername,
  email,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  toggleSignUp,
  handleGoogleSignIn,
  isSSOLoading,
  isEmailValid,
  handleEmailBlur,
  handleEmailChange,
}) {
  const router = useRouter();
  const [isCTALoading, setIsCTALoading] = useState(false);
  const handleSignUp = async () => {
    setIsCTALoading(true);
    try {
      const user = await signUp(email, password, username);
      setIsCTALoading(false);
      router.replace("/dashboard");
    } catch (error) {
      setIsCTALoading(false);
      alert("Sign-up failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <CustomInput
        label={"Full Name"}
        type={"text"}
        value={username}
        onChange={setUsername}
        placeholder={"Enter your full name"}
        iconUrl={"/icons/userWhite.svg"}
      />
      <CustomInput
        label={"Email Address"}
        type={"email"}
        value={email}
        onChange={handleEmailChange}
        placeholder={"Enter your email address"}
        iconUrl={"/icons/email.svg"}
        isError={!isEmailValid}
        handleBlur={handleEmailBlur}
        errorMessage={"Invalid email address"}
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
        text={"Sign Up"}
        handleClick={handleSignUp}
        isLoading={isCTALoading}
        secondaryIconUrl={"/icons/login.svg"}
      />

      <div className="flex flex-row items-center justify-center gap-1 text-sm">
        <span>Already have an account?</span>
        <button
          onClick={toggleSignUp}
          className="text-[#4F45E4] font-semibold cursor-pointer"
        >
          Sign In
        </button>
      </div>

      <CustomCTA
        text={"Sign Up With Google"}
        handleClick={handleGoogleSignIn}
        primaryIconUrl={"/icons/google.svg"}
        btnBg={"bg-[#111729]"}
        isLoading={isSSOLoading}
      />
    </div>
  );
}
