"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";


const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [buttonDisabled , setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    useEffect(()=> { 
        if(email.length>0) { 
            setButtonDisabled(false)
        }
    },[email])
    const onSubmit = async() => { 
        try {
            setLoading(true)
            await axios.post('/api/users/forgotPassword/sendToken', {email})
            toast.success("Email Sent Check inbox")
            
        } catch (error : any) {
            console.log (error.message)
        }
        finally{
          setLoading(false)
        }

    }
  return (<>
  <div><Toaster/></div>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-sans font-extrabold my-5">Forgot Password</h1>
      <hr></hr>
      <label htmlFor="email" className="m-1 capitalize font-sans font-semibold">
        email
      </label>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
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
}
export default ForgotPassword