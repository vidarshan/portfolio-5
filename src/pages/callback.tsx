"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Callback = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // Send the code to your backend to exchange for tokens
      fetch("/api/spotify/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Tokens:", data);
          // Maybe redirect user to home after success
          window.location.href = "/";
        });
    }
  }, [searchParams]);

  return (
    <div>
      <p>Processing Spotify login...</p>
    </div>
  );
};

export default Callback;
