import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Props {
  instances: Array<string>;
}

export default function Sidebar({ instances }: Props) {
  const params = useParams();
  const navigate = useNavigate();

  function getSelectedClass(instanceName: string) {
    if (params.id == instanceName) {
      return "bg-zinc-200 dark:bg-zinc-800";
    }
  }
  return (
    <div className="h-screen dark:bg-zinc-950 border-r py-16">
      <h2 className="text-xl font-semibold mb-8 text-center">Instances</h2>
      <Link to={"/"}>
        <Button className="rounded-none space-x-2 w-full">
          <Plus strokeWidth={1} />
          <span>New Instance</span>
        </Button>
      </Link>
      <div className="mt-8">
        <ul>
          {instances.map((instance) => {
            return (
              // <li className="hover:bg-gray-100 w-full px-8">
              <Button
                key={instance}
                variant={"link"}
                className={
                  "hover:bg-zinc-200 dark:hover:bg-zinc-800 w-full rounded-none " +
                  getSelectedClass(instance)
                }
                onClick={() => navigate("/dashboard/" + instance)}
              >
                {instance}
              </Button>
              // </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
