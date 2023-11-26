"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      // router.push("/login");
      toast.success('Email send. Check inbox')
    } catch (e) {
      console.log("SignUpfailed" + e);
      // toast.error(e.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-sans font-extrabold my-5">Signup</h1>
      <hr></hr>
      <label
        htmlFor="username"
        className="m-1 capitalize font-sans font-semibold"
      >
        username
      </label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="username"
        className="p-4 border-2 rounded-lg m-2"
      />
      <label htmlFor="email" className="m-1 capitalize font-sans font-semibold">
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
        onClick={onSignup}
      >
        {loading ? "loading" : "Sign up"}
      </button>
      <Link href="/login" className="py-3 underline hover:opacity-80">
        Click here if you have already signed up
      </Link>
    </div>
  );
}
