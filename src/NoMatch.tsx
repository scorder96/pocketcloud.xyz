import { useEffect } from "react";
import frog from "/frog.png";

export default function NoMatch() {
  useEffect(() => {
    document.title = "404";
  }, []);
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <img src={frog} alt="" />
      <h1 className="text-2xl font-bold my-8">This page doesn't exist</h1>
      <p className="pb-8 text-sm">Check the URL again</p>
      <i>PocketCloud</i>
    </div>
  );
}
