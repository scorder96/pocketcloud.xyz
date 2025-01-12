import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  onDeployContinue: () => void;
}
export function DeployCard({ onDeployContinue }: Props) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>New database</CardTitle>
        <CardDescription>Deploy a new instance in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={onDeployContinue}>
          Deploy
        </Button>
      </CardContent>
      {/* <CardFooter className="flex justify-center"> */}
      {/* <span className="text-sm font-light"> */}
      {/* You can import database configurations later */}
      {/* </span> */}
      {/* <Button variant="outline">Cancel</Button> */}
      {/* <Button className="w-full">Deploy</Button> */}
      {/* </CardFooter> */}
    </Card>
  );
}
