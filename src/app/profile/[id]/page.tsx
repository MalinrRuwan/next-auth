"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function UserProfile({ params }: any) {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (e: any) {
      console.log(e.message);
      //toast
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr></hr>
      <p className="text-4xl font-bold m-4">
        Profile
        <span className="font-bold rounded bg-orange-500 p-2 ml-1 text-white">
          {params.id}
        </span>
      </p>
      <button
        className="button btn bg-black rounded-lg text-white p-2 hover:opacity-80 my-2"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}
