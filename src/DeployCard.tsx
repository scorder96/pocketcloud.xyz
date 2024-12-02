import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function DeployCard() {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function onDeploy() {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
      navigate("dashboard/new");
    }, 1000);
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>New database</CardTitle>
        <CardDescription>Deploy a new instance in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={onDeploy} disabled={Loading}>
          {Loading ? "Deploying" : "Deploy"}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <span className="text-sm font-light">
          You can import database configurations later
        </span>
        {/* <Button variant="outline">Cancel</Button> */}
        {/* <Button className="w-full">Deploy</Button> */}
      </CardFooter>
    </Card>
  );
}
