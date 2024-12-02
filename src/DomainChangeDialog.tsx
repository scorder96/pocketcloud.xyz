import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./components/ui/button";
import { Link } from "lucide-react";
import { Input } from "./components/ui/input";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pb from "./pocketbase";
import isValidDomain from "is-valid-domain";

interface Props {
  instanceid: string;
}
export default function DomainChangeDialog({ instanceid }: Props) {
  useEffect(() => {
    getDomainRequest();
  }, []);
  const [Domain, setDomain] = useState(String);
  const [DomainID, setDomainID] = useState(String);
  const [InvalidDomain, setInvalidDomain] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Next, setNext] = useState(false);

  const params = useParams();
  async function getDomainRequest() {
    const record = await pb
      .collection("domains")
      .getFirstListItem("instance='" + instanceid + "'")
      .catch(() => {});
    if (record) {
      setNext(true);
      setDomain(record.domain);
      setDomainID(record.id);
    }
  }
  async function resetDomain() {
    await pb.collection("domains").delete(DomainID);
    setNext(false);
  }
  async function requestDomainChange() {
    setInvalidDomain(false);
    setLoading(true);
    const data = {
      instance: instanceid,
      domain: Domain,
    };
    await pb
      .collection("domains")
      .create(data)
      .catch((err) => console.log(err));
    await getDomainRequest();
    setLoading(false);
  }
  function checkDomainValidity() {
    isValidDomain(Domain) ? requestDomainChange() : setInvalidDomain(true);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Link size={16} className="me-2" />
          Custom Domain
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{!Next ? "Custom Domain" : "Verify Ownership"}</DialogTitle>
          <DialogDescription>
            {!Next ? (
              "Enter your registered domain name."
            ) : (
              <>
                Add the following <b>TXT</b> record to your <b>{Domain}</b> DNS
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        {!Next ? (
          <Input
            placeholder="example.com"
            onChange={(e) => {
              setDomain(e.target.value);
            }}
            onKeyDown={(e) => e.key == "Enter" && checkDomainValidity()}
            value={Domain}
          />
        ) : (
          <>
            <div className="flex justify-between font-bold">
              <span>Name</span>
              <span>Value</span>
              <span>TTL</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span>@</span>
              <span>pocketcloud-verif-{params.id}</span>
              <span>300-600</span>
            </div>
            <hr />
            <span className="text-sm">
              Once verified, your custom domain will be enabled within a few hours.
            </span>
          </>
        )}
        {InvalidDomain && (
          <span className="text-sm text-red-500">
            Please enter a correct domain name like 'example.com'
          </span>
        )}
        <DialogFooter>
          {!Next ? (
            <Button onClick={checkDomainValidity} disabled={Loading}>
              Done
            </Button>
          ) : (
            <>
              <Button variant={"secondary"} onClick={resetDomain}>
                Change Domain
              </Button>
              <DialogClose asChild>
                <Button>Okay</Button>
              </DialogClose>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
