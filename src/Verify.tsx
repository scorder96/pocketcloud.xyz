import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FormEvent, useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import pb from "./pocketbase";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
}
export default function Verify({ onClose }: Props) {
  useEffect(() => {
    sendemail();
  }, []);
  const [Error, setError] = useState(String);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function sendemail() {
    await pb
      .collection("users")
      .requestVerification(pb.authStore.model?.email)
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    console.log("mail sent");
  }
  async function verify(event: FormEvent) {
    setError("");
    setLoading(true);
    event.preventDefault();
    const user = await pb.collection("users").getOne(pb.authStore.model?.id);
    setLoading(false);
    if (user.verified) {
      navigate("/dashboard/new");
      onClose();
    } else {
      setError("Please check again");
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Verify</DialogTitle>
        <DialogDescription>
          Check your inbox (and spam) to find the email we sent you for verification
        </DialogDescription>
      </DialogHeader>
      {Error && (
        <div className="flex items-center space-x-2 mt-4">
          <TriangleAlert color="red" />
          <span className="text-red-500">{Error}</span>
        </div>
      )}
      <Button type="submit" onClick={verify} disabled={Loading}>
        {Loading ? "Loading" : "I have verified"}
      </Button>
    </DialogContent>
  );
}
