"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ToastBar } from "react-hot-toast";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(error);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      setVerified(true);
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black rounded">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <Link href="/login">
            <p className="text-blue-500">Login</p>
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h1 className="text-2xl bg-red-500 text-white">Error</h1>
        </div>
      )}
    </div>
  );
}
