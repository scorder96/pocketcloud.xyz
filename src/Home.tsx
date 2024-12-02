import { useEffect, useState } from "react";
import { DeployCard } from "./DeployCard";
import frog from "/frog.png";
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    document.title = "PocketCloud - PocketBase Hosting";
  }, []);
  const [Hovering, setHovering] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-screen dark:bg-zinc-900">
      <h1 className="text-4xl text-center mb-16">
        ⚡Super Fast <b>PocketBase</b> Hosting⚡
      </h1>
      <div className="absolute">
        <motion.img
          initial={{ marginLeft: 280 }}
          animate={Hovering ? { marginLeft: 418 } : {}}
          src={frog}
          className="rotate-90"
          alt="frog"
        />
      </div>

      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="z-10"
      >
        <DeployCard />
      </div>
      <Link to={"/dashboard"}>
        <Button variant={"link"} className="mt-8">
          Log In to Dashboard
        </Button>
      </Link>
    </div>
  );
}
