import CustomInput from "@/components/CustomInput";
import CustomCTA from "@/components/CustomCTA";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SignIn({
  email,
  setEmail,
  password,
  setPassword,
  toggleSignUp,
  handleGoogleSignIn,
}) {
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      const user = await signIn(email, password);
      console.log("User signed in:", user);
      router.replace("/dashboard");
    } catch (error) {
      console.error("Sign-up error:", error.message);
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
        text={"Sign In"}
        handleClick={handleSignIn}
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
        onClick={handleGoogleSignIn}
        primaryIconUrl={"/icons/google.svg"}
        btnBg={"bg-[#111729]"}
      />
    </div>
  );
}
