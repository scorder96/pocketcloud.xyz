import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "./components/ui/button";
import { Trash } from "lucide-react";
import pb from "./pocketbase";
import { useNavigate, useParams } from "react-router-dom";
interface Props {
  instanceid: string;
  onRemoving: (loadstate: boolean) => void;
}
export default function DeleteAlert({ instanceid, onRemoving }: Props) {
  const params = useParams();
  const navigate = useNavigate();
  async function remove() {
    onRemoving(true);
    const record = await pb
      .collection("instances")
      .delete(instanceid)
      .catch((err) => console.log(err));
    if (record) {
      await fetch(import.meta.env.VITE_API_URL + "delete/" + params.id)
        .then(() => {
          navigate("/dashboard");
          navigate(0);
        })
        .catch((err) => console.log(err));
    }
    onRemoving(false);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"}>
          <Trash strokeWidth={1} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will <b>permanently</b> delete your
            database and all data stored in it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={remove}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
