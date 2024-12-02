import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";
interface Props {
  open: boolean;
}
export default function MaxInstancesDialog({ open }: Props) {
  useEffect(() => {
    setOpen(open);
  }, [open]);
  const [Open, setOpen] = useState(false);
  return (
    <Dialog open={Open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Instance limit reached ☹️</DialogTitle>
          <DialogDescription>
            The free plan supports upto 3 instances at a time. Upgrade to unlock 100
            instances and unlimited features.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link to={"/pricing"}>
            <Button>Pricing</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
