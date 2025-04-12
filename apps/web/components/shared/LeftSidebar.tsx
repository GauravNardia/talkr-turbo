"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Mic,
  Sparkles,
  FileText,
  Crown,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { spawn } from "child_process";
import { Span } from "next/dist/trace";

const sidebarVariants = {
  open: { width: 220, transition: { duration: 0.3 } },
  closed: { width: 65, transition: { duration: 0.3 } },
};

const LeftSidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("/"); // Default Home
  const router = useRouter();

  const handleRedirect = (path: string) => {
    setActiveTab(path);
    router.push(path);
  };

  return (
    <motion.div
      className="h-screen bg-black border-r border-neutral-800 hidden md:flex flex-col p-4 text-white fixed z-20"
      animate={isHovered ? "open" : "closed"}
      variants={sidebarVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <Link href="/app/home" className={`w-10 h-10 flex items-center justify-center font-bold text-lg mb-6 shadow-sm rounded-lg ${isHovered && "justify-start px-5 w-full shadow-none"}`}>
        <div className="flex justify-center items-center">{isHovered ? <span className="flex gap-2 justify-start w-full items-left"><Image src='/assets/icons/logo.svg' alt="logo" width={25} height={25} />Talkr</span> : <Image src='/assets/icons/logo.svg' alt="logo" width={30} height={30}/>}</div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col justify-center items-center space-y-1">
        <Button
          variant="ghost"
          className={`flex items-center justify-center text-white hover:text-white font-regular w-10 h-10 cursor-pointer ${isHovered && "justify-start w-full"} rounded-md transition ${
            activeTab === "/app/home" ? "bg-green-500 text-white" : "hover:bg-green-500 text-white"
          }`}
          onClick={() => handleRedirect("/app/home")}
        >
          <Home size={20} className="text-white" />
          {isHovered && <span>Home</span>}
        </Button>  
      </nav>

      {/* Sections */}
      {isHovered && <div className="text-xs font-semibold text-gray-500 mt-12 mb-3">Practice</div>}
      <nav className={`flex flex-col justify-center items-center space-y-1 ${ isHovered || !isHovered && "mt-12"}`}>
        <Button
          variant="ghost"
          className={`flex text-sm text-white hover:text-white font-regular items-center justify-center w-10 h-10 cursor-pointer ${isHovered && "justify-start w-full"} rounded-md transition ${
            activeTab === "/app/practice" ? "bg-green-500 text-white" : "hover:bg-green-500 text-white"
          }`}
          onClick={() => handleRedirect("/app/practice")}
        >
          <Mic size={20} className="text-white"  />
          {isHovered && <span>Practice</span>}
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center text-white hover:text-white justify-center w-10 h-10 cursor-pointer ${isHovered && "justify-start w-full"} rounded-md transition ${
            activeTab === "/app/quiz" ? "bg-green-500 text-white" : "hover:bg-green-500 text-white"
          }`}
          onClick={() => handleRedirect("/app/quiz")}
        >
          <Sparkles size={20} className="text-white"  />
          {isHovered && <span>Quiz</span>}
        </Button>
      </nav>

      {/* Products */}
      {isHovered && <div className="text-xs font-semibold text-gray-500 mt-12 mb-3">Rewards</div>}
      <nav className={`flex flex-col justify-center items-center space-y-1 ${ isHovered || !isHovered && "mt-12"}`}>
        <Button
          variant="ghost"
          className={`flex items-center text-white hover:text-white justify-center w-10 h-10 cursor-pointer ${isHovered && "justify-start w-full"} rounded-md transition ${
            activeTab === "/app/leaderboard" ? "bg-green-500 text-white" : "hover:bg-green-500 text-white"
          }`}
          onClick={() => handleRedirect("/app/leaderboard")}
        >
          <Crown size={20} className="text-white"  />
          {isHovered && <span>Leaderboard</span>}
        </Button>
      </nav>

      {/* bottom */}
      <div className="flex flex-col mt-70">
      <nav className={`flex flex-col justify-start items-start space-y-1 ${ isHovered || !isHovered && "mt-12"}`}>
          {isHovered ? <span><UserButton/></span> :<UserButton/>}
      </nav>
      </div>
    </motion.div>
  );
};

export default LeftSidebar;
