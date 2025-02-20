import CustomInput from "@/components/CustomInput";
import CustomCTA from "@/components/CustomCTA";
import { signUp } from "@/lib/auth";

export default function SignUp({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  toggleSignUp,
  handleGoogleSignIn,
}) {
  const handleSignUp = async () => {
    console.log("Signing up...");
    try {
      const user = await signUp(email, password, username);
      console.log("User signed up:", user);
      alert("Sign-up successful!");
    } catch (error) {
      console.error("Sign-up error:", error.message);
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
        iconAlt={"email"}
      />
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
        handleClick={handleSignUp}
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
        onClick={handleGoogleSignIn}
        primaryIconUrl={"/icons/google.svg"}
        btnBg={"bg-[#111729]"}
      />
    </div>
  );
}
