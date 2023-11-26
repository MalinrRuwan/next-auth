"use client"

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { get } from "http";
export default function ProfilePage() {
  const [data, setData] = useState('')


  const getDetails = async ()=> { 
    const response = await axios.get('/api/users/me');
    console.log(response.data);
    setData(response.data.data._id)

  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr></hr>
      <h2 className="p-3 rounded bg-green-300">
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button className="button btn bg-black rounded-lg text-white p-2 hover:opacity-80 my-2"
      onClick={getDetails}>
        Get user details
      </button>
    </div>
  );
}
