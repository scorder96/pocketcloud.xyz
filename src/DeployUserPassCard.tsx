import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./components/ui/input";

export default function DeployUserPassCard() {
  const [Loading, setLoading] = useState(false);
  const [Password, setPassword] = useState(String);
  const [Strength, setStrength] = useState(0);
  const navigate = useNavigate();

  const calculateStrength = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event?.target.value;
    setPassword(password);
    let strength = 0;
    if (password.length > 0) strength += 20;
    if (password.length > 6) strength += 20;
    if (password.length > 10) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    setStrength(strength);
  };
  function getStrengthClass(bar: number) {
    var strengthClassArray: Array<String> = [];
    switch (Strength) {
      case 0:
        strengthClassArray = [
          "bg-neutral-800",
          "bg-neutral-800",
          "bg-neutral-800",
          "bg-neutral-800",
          "bg-neutral-800",
        ];
        break;
      case 20:
        strengthClassArray = [
          "bg-red-500",
          "bg-neutral-800",
          "bg-neutral-800",
          "bg-neutral-800",
          "bg-neutral-800",
        ];
        break;
      case 40:
        strengthClassArray = [
          "bg-red-500",
          "bg-red-500",
          "bg-neutral-800",
          "bg-neutral-800",
          "bg-neutral-800",
        ];
        break;
      case 60:
        strengthClassArray = [
          "bg-yellow-500",
          "bg-yellow-500",
          "bg-yellow-500",
          "bg-neutral-800",
          "bg-neutral-800",
        ];
        break;
      case 80:
        strengthClassArray = [
          "bg-yellow-500",
          "bg-yellow-500",
          "bg-yellow-500",
          "bg-yellow-500",
          "bg-neutral-800",
        ];
        break;
      case 100:
        strengthClassArray = [
          "bg-green-500",
          "bg-green-500",
          "bg-green-500",
          "bg-green-500",
          "bg-green-500",
        ];
        break;
      default:
        strengthClassArray = [
          "bg-green-500",
          "bg-green-500",
          "bg-green-500",
          "bg-green-500",
          "bg-green-500",
        ];
    }
    return strengthClassArray[bar];
  }

  function onDeploy(e: FormEvent) {
    e.preventDefault();
    localStorage.setItem("pc_inst_pass", Password);
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
      navigate("dashboard/new");
    }, 1000);
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Instance Password</CardTitle>
        <CardDescription>You will use this to sign in to your instance</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onDeploy} className="space-y-4">
          <Input
            type="password"
            placeholder="Password"
            onChange={calculateStrength}
            required
          />
          <div className="flex justify-between space-x-1">
            <div className={"w-full h-2 " + getStrengthClass(0)} />
            <div className={"w-full h-2 " + getStrengthClass(1)} />
            <div className={"w-full h-2 " + getStrengthClass(2)} />
            <div className={"w-full h-2 " + getStrengthClass(3)} />
            <div className={"w-full h-2 " + getStrengthClass(4)} />
          </div>
          <Button className="w-full" disabled={Loading}>
            {Loading ? "Deploying" : "Deploy"}
          </Button>
        </form>
      </CardContent>
      {/* <CardFooter className="flex justify-center"> */}
      {/* <span className="text-sm font-light"> */}
      {/* This will be the authentication for your instance */}
      {/* </span> */}
      {/* <Button variant="outline">Cancel</Button> */}
      {/* <Button className="w-full">Deploy</Button> */}
      {/* </CardFooter> */}
    </Card>
  );
}
