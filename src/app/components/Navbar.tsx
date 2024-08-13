import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="navbar bg-warning text-primary-content fixed z-50">
      <div className="flex justify-between w-full mx-4">
        <p className="text-xl font-bold text-base-100">Pokemon</p>
        <Image
          src="/android-chrome-192x192.png"
          alt="Pokemon"
          width={50}
          height={50}
          className="animate-floating"
        />
        <ThemeSwitch />
      </div>
    </div>
  );
}
