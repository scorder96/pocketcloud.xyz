import { ExternalLink } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Codeblock from "./Codeblock";
import Sidebar from "./Sidebar";
import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";
import DeleteAlert from "./DeleteAlert";
import pb from "./pocketbase";
import AuthModal from "./AuthModal";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "./LoadingOverlay";
import MaxInstancesDialog from "./MaxInstancesDialog";
import DataUploadDialog from "./DataUploadDialog";
import PublicUploadDialog from "./PublicUploadDialog";
import DomainChangeDialog from "./DomainChangeDialog";
import HooksUploadDialog from "./HooksUploadDialog";

var instances: Array<string> = [];
var instanceids: Array<string> = [];
var instancepowers: Array<boolean> = [];
export default function Dashboard() {
  const [Loading, setLoading] = useState(false);
  const [AuthState, setAuthState] = useState(0);
  useEffect(() => {
    document.title = "Dashboard";
    AuthState == 0 && startupManager();
  }, [AuthState]);
  const params = useParams();
  const navigate = useNavigate();
  const [Instances, setInstances] = useState(Array<string>);
  const [InstanceIDs, setInstanceIDs] = useState(Array<string>);
  const [InstancePowers, setInstancePowers] = useState(Array<boolean>);
  const [MaxInstances, setMaxInstances] = useState(false);
  const [NoInstances, setNoInstances] = useState(false);

  async function startupManager() {
    setLoading(true);
    // If user logged in, check if email verified
    if (pb.authStore.isValid) {
      const user = await pb.collection("users").getOne(pb.authStore.model?.id);
      if (user.verified) {
        var instancescopy = await getInstances();
        // If new instance requested, deploy. Else, navigate to the latest instance if it exists
        if (params.id == "new") {
          await deploy(instancescopy);
        } else if (params.id == undefined || params.id == "undefined") {
          if (instancescopy[0] == undefined) {
            setNoInstances(true);
          } else {
            navigate("/dashboard/" + instancescopy[0]);
          }
        }
      } else {
        setAuthState(3); // Verify
      }
    } else {
      setAuthState(1); // Signup
    }
    setLoading(false);
  }

  async function getInstances() {
    const records = await pb.collection("instances").getFullList({
      sort: "-created",
      fields: "instance,id,power",
    });
    for (let i = 0; i < records.length; i++) {
      instances = [...instances, records[i].instance];
      instanceids = [...instanceids, records[i].id];
      instancepowers = [...instancepowers, records[i].power];
    }
    setInstances(instances);
    setInstanceIDs(instanceids);
    setInstancePowers(instancepowers);
    var instancescopy = instances;
    instances = [];
    instanceids = [];
    instancepowers = [];
    return instancescopy;
  }
  async function pause() {
    const record = await pb
      .collection("instances")
      .update(InstanceIDs[Instances.indexOf(params.id!)], {
        power: false,
      });
    if (record) {
      await fetch(import.meta.env.VITE_API_URL + "pause/" + params.id)
        .then(() => {
          getInstances();
        })
        .catch((err) => console.log(err));
    }
  }
  async function unpause() {
    const record = await pb
      .collection("instances")
      .update(InstanceIDs[Instances.indexOf(params.id!)], {
        power: true,
      });
    if (record) {
      await fetch(import.meta.env.VITE_API_URL + "unpause/" + params.id)
        .then(() => {
          getInstances();
        })
        .catch((err) => console.log(err));
    }
  }
  function randomSlug() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  async function deploy(instancescopy: Array<string>) {
    if (instancescopy.length >= 3) {
      setMaxInstances(true);
      navigate("/dashboard/" + instancescopy[0]);
      return;
    }
    const slug = randomSlug();
    const data = {
      user: pb.authStore.model!.id,
      instance: slug,
      power: true,
    };
    const record = await pb
      .collection("instances")
      .create(data)
      .catch((err) => console.log(err));
    if (record) {
      await fetch(import.meta.env.VITE_API_URL + "deploy/" + slug, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pb.authStore.model!.email,
          pass: localStorage.getItem("pc_inst_pass"),
        }),
      })
        .then(() => {
          localStorage.removeItem("pc_inst_pass");
          navigate("/dashboard/" + slug);
        })
        .catch((err) => console.log(err));
    }
    await getInstances();
  }

  var link = "https://" + params.id + ".pocketcloud.xyz/_/";

  return (
    <>
      <AuthModal authState={AuthState} onChangeAuthState={setAuthState} />
      <Navbar />
      <MaxInstancesDialog open={MaxInstances} />
      {Loading && <LoadingOverlay />}
      <div className="grid grid-cols-6 dark:bg-zinc-950 dark:text-white">
        <Sidebar instances={Instances} />
        <div className="px-32 pt-16 col-span-5">
          {NoInstances ? (
            <h1 className="text-xl">Create a new instance to get started</h1>
          ) : (
            <>
              <Link to={link} target="_blank" className="flex space-x-2">
                <h1 className="text-xl">
                  Deployed at <u>{link}</u>
                </h1>
                <ExternalLink />
              </Link>
              <div className="flex justify-between space-x-2 mt-8">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="power-status">Power</Label>
                  <Switch
                    id="power-status"
                    checked={InstancePowers[Instances.indexOf(params.id!)]}
                    onCheckedChange={(e) => {
                      e ? unpause() : pause();
                    }}
                  />
                </div>
                <DeleteAlert
                  instanceid={InstanceIDs[Instances.indexOf(params.id!)]}
                  onRemoving={setLoading}
                />
              </div>
              {InstancePowers[Instances.indexOf(params.id!)] && (
                <div className="space-x-4 mt-8">
                  <DataUploadDialog
                    instanceid={InstanceIDs[Instances.indexOf(params.id!)]}
                  />
                  <HooksUploadDialog
                    instanceid={InstanceIDs[Instances.indexOf(params.id!)]}
                  />
                  <PublicUploadDialog
                    instanceid={InstanceIDs[Instances.indexOf(params.id!)]}
                  />
                  <DomainChangeDialog
                    instanceid={InstanceIDs[Instances.indexOf(params.id!)]}
                  />
                </div>
              )}
              <hr className="mt-8 border  " />
              <h3 className="text-lg mt-8 mb-4 font-semibold">API Link</h3>
              <Codeblock code={link.replace("/_/", "")} />
              <div className="my-8">
                <Link to={"/tutorials/setting-up"} target="_blank" className="underline">
                  View full documentation
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
