"use client";
import React, { useState, useEffect } from "react";

export default function Home() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

    function submissionHandle(e:any) {
        e.preventDefault();
        setUsername(e.target['username'].value);
        setEmail(e.target['email'].value);
    }

    useEffect(() => {
      const login = localStorage.getItem("username");
        if (login) { 
            window.location.href = "/";
         }
    }, []);

    useEffect(() => {

        if (username && email) {
          localStorage.setItem("username", username);
          localStorage.setItem("email", email);
          window.location.href = "/";
        }
    }, [username, email]);

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen w-screen overflow-auto bg-gray-200">
      <h1 className="text-4xl font-black">LOG-IN</h1>
      <form onSubmit={submissionHandle} className="flex-col w-full gap-4 flex items-center">
        <input type="text" name="username" required placeholder="Username" className="outline-none bg-white rounded-md p-2 md:w-4/10 w-8/10 text-black"/>
        <input type="email" name="email" required placeholder="E-Mail" className="outline-none bg-white rounded-md p-2 md:w-4/10 w-8/10 text-black"/>
        <input type="password" name="password" required placeholder="Password" className="outline-none bg-white rounded-md p-2 md:w-4/10 w-8/10 text-black"/>
        <input type="submit" className="px-6 w-max p-2 bg-red-400 text-white rounded-md" />
      </form>
    </div>
  );
}
