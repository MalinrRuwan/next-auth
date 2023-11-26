"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const ChangePassword = () => {
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/users/forgotPassword/changePassword",
        { token, password: password.password }
      );
      if (response.data.success === true) {
        setSuccess(true);
        toast.success("Password Change success");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      password.confirmPassword.length > 0 &&
      password.password.length > 0 &&
      password.confirmPassword === password.password
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password]);
  const [token, setToken] = useState("");
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (success) {
    }
  }, [success]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-sans font-extrabold my-5">
          Change Password
        </h1>
        <hr></hr>
        <label
          htmlFor="password"
          className="m-1 capitalize font-sans font-semibold"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password.password}
          onChange={(e) => {
            setPassword({ ...password, password: e.target.value });
          }}
          placeholder="Password"
          className="p-4 border-2 rounded-lg m-2"
        />
        <label
          htmlFor="confirm-password"
          className="m-1 capitalize font-sans font-semibold"
        >
          Confirm password
        </label>
        <input
          id="confirm-password"
          type="password"
          value={password.confirmPassword}
          onChange={(e) => {
            setPassword({ ...password, confirmPassword: e.target.value });
          }}
          placeholder="Confirm Password"
          className="p-4 border-2 rounded-lg m-2"
        />
        <button
          className="button btn bg-black rounded-lg text-white p-2 hover:opacity-80 disabled:opacity-50"
          disabled={buttonDisabled ? true : false}
          onClick={onSubmit}
        >
          {loading ? "Loading" : "Submit"}
        </button>
      </div>
    </>
  );
};
export default ChangePassword;
