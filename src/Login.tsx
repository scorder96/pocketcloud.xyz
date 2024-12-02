import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { FormEvent, useState } from "react";
import { TriangleAlert } from "lucide-react";
import pb from "./pocketbase";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import google from "./assets/google.png";

interface Props {
  onSignup: () => void;
  onClose: () => void;
}

export default function Login({ onSignup, onClose }: Props) {
  const [Email, setEmail] = useState(String);
  const [Password, setPassword] = useState(String);
  const [Error, setError] = useState(String);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function logIn(event: FormEvent) {
    setError("");
    setLoading(true);
    event.preventDefault();
    await pb
      .collection("users")
      .authWithPassword(Email, Password)
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    if (pb.authStore.isValid) {
      setLoading(false);
      navigate("/dashboard");
      onClose();
    }
  }
  async function authsignin() {
    const authData = await pb.collection("users").authWithOAuth2({ provider: "google" });
    if (authData) {
      pb.authStore.isValid && navigate(0);
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Log in to continue⚡</DialogTitle>
        <DialogDescription>
          Login to your account to save your deployment
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={(e) => logIn(e)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-medium text-sm">
              Email
            </Label>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="font-medium text-sm">
              Password
            </Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              required
            />
          </div>
        </div>
        {Error && (
          <div className="flex items-center space-x-2 mt-4">
            <TriangleAlert color="red" />
            <span className="text-red-500">{Error}</span>
          </div>
        )}
        <p className="text-center my-4 font-light">or</p>
        <Button
          variant={"secondary"}
          type="button"
          className="w-full"
          onClick={authsignin}
        >
          <img src={google} alt="google logo" className="h-4 me-2" />
          Google Auth
        </Button>
        <div className="flex justify-between mt-8">
          <Button type="button" variant={"outline"} onClick={onSignup}>
            I don't have an account
          </Button>
          <Button type="submit" formAction="submit" disabled={Loading}>
            {Loading ? "Loading" : "Continue"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
