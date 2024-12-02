import { useEffect } from "react";
import Navbar from "../Navbar";
import TutorialListing from "./TutorialListing";
import frog from "/frog.png";

export default function Tutorials() {
  useEffect(() => {
    document.title = "Tutorials";
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-8 space-y-4">
        <img src={frog} alt="" />
        <h1 className="text-2xl">PocketCloud Tutorials</h1>
      </div>
      <div className="px-16 space-y-8">
        <TutorialListing
          title="How to host PocketBase"
          tag="Tutorial"
          description="PocketBase by itself is self-hosted only, i.e. it does not provide a built-in hosting service. Which means you need some external setup to host your PocketBase instance, so your web app can access it in production. This process is usually very complicated and time consuming. This tutorial will walk you through an easy way to host your PocketBase instance."
          date="8th Nov 2024"
        />
        <TutorialListing
          title="Setting up your project with PocketCloud"
          tag="Installation"
          description="This tutorial will walk you through setting up PocketCloud to get started with using hosted PocketBase in your project."
          date="3rd Nov 2024"
        />
      </div>
    </>
  );
}
