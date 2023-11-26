"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Toaster } from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success");
      router.push(`/profile`);
    } catch (e: any) {
      console.log("login failed", e.message);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-sans font-extrabold my-5">Login</h1>
        <hr></hr>
        <label
          htmlFor="email"
          className="m-1 capitalize font-sans font-semibold"
        >
          email
        </label>
        <input
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          placeholder="email"
          className="p-4 border-2 rounded-lg m-2"
        />
        <label
          htmlFor="password"
          className="m-1 capitalize font-sans font-semibold"
        >
          password
        </label>
        <input
          id="password"
          type="text"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          placeholder="password"
          className="p-4 border-2 rounded-lg m-2"
        />
        <button
          className="button btn bg-black rounded-lg text-white p-2 hover:opacity-80 disabled:opacity-50"
          disabled={buttonDisabled ? true : false}
          onClick={onLogin}
        >
          {loading ? "Loading" : "Login"}
        </button>
        <Link href="/signup" className="py-3 underline hover:opacity-80">
          Click here if you have not signed up
        </Link>
        <Link
          href="/forgotpassword"
          className="py-2 underline hover:opacity-80 text-xs text-slate-700"
        >
          Forgot password?
        </Link>
      </div>
    </>
  );
}
