import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./components/ui/button";
import { useState } from "react";
import pb from "./pocketbase";

export default function PayModal() {
  const [Plan, setPlan] = useState("yearly");
  const [Loading, setLoading] = useState(false);
  const [Open, setOpen] = useState(false);
  async function paymentRequest() {
    setLoading(true);
    const data = {
      user: pb.authStore.model?.id,
      plan: Plan,
    };

    await pb
      .collection("payments")
      .create(data)
      .catch(() => {
        alert("There was a problem. If this error persists, please contact support.");
        setLoading(false);
      });
    setLoading(false);
    setOpen(false);
  }
  return (
    <Dialog open={Open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Continue</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>PocketCloud Membership</DialogTitle>
          <DialogDescription>
            You will receive an email invoice within a few hours
          </DialogDescription>
        </DialogHeader>
        <div className="space-x-4">
          <Button
            variant={"secondary"}
            className={Plan == "monthly" ? "w-40 border-2 border-blue-300" : "w-40"}
            onClick={() => setPlan("monthly")}
          >
            Monthly $19
          </Button>
          <Button
            variant={"secondary"}
            className={Plan == "yearly" ? "w-40 border-2 border-blue-300" : "w-40"}
            onClick={() => setPlan("yearly")}
          >
            Yearly $199
          </Button>
        </div>
        <span className="text-sm font-light">Save 12% with an annual plan</span>
        <DialogFooter>
          <Button onClick={paymentRequest} disabled={Loading}>
            Sounds Good
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
