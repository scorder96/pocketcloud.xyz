import { CircleUser, SunMoon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import pb from "./pocketbase";
import { Button } from "./components/ui/button";
import { useTheme } from "./components/theme-provider";

export default function Navbar() {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  function handleTheme() {
    if (localStorage.getItem("vite-ui-theme") == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <nav className="shadow h-16 flex justify-between items-center px-8 dark:bg-zinc-950 dark:text-white border-b">
      <Link to={"/"} className="text-xl">
        PocketCloud
      </Link>
      <div className="flex items-center space-x-8">
        <Link to={"https://discord.gg/P8ny2rMyms"} target="_blank">
          Discord
        </Link>
        {pb.authStore.isValid && <Link to={"/pricing"}>Pricing</Link>}
        {pb.authStore.isValid && <Link to={"/support"}>Support</Link>}
        <Button variant={"ghost"} onClick={handleTheme}>
          <SunMoon strokeWidth={1} size={32} />
        </Button>
        <Popover>
          <PopoverTrigger>
            <CircleUser size={32} strokeWidth={1} />
          </PopoverTrigger>
          <PopoverContent className="flex justify-between items-center">
            {pb.authStore.model?.email}{" "}
            {pb.authStore.isValid ? (
              <Button
                variant={"link"}
                className="text-red-500"
                onClick={() => {
                  pb.authStore.clear();
                  navigate("/");
                }}
              >
                Log Out
              </Button>
            ) : (
              <Button
                variant={"link"}
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Log In
              </Button>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
