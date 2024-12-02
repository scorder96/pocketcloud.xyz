import Navbar from "./Navbar";
import { Check } from "lucide-react";
import PayModal from "./PayModal";
import { useEffect } from "react";

export default function Pricing() {
  useEffect(() => {
    document.title = "PocketCloud - Pricing";
  }, []);
  return (
    <>
      <Navbar />
      <div className="px-32 pt-16">
        <h1 className="text-xl">PocketCloud Supporters 🫶</h1>
        <p className="mt-8">
          We are still under development, and need funds to upgrade to better servers and
          provide better service
        </p>
        <p>PocketCloud can grow with the help of early supporters</p>
        <p>Consider supporting us to become a forever treasured member 🖤</p>
        <ul className="mt-4 space-y-4">
          <li className="flex">
            <Check color="green" />
            &nbsp;Upto 100 instances
          </li>
          <li className="flex">
            <Check color="green" />
            &nbsp;Unlimited bandwidth
          </li>
          <li className="flex">
            <Check color="green" />
            &nbsp;Unlimited CPU
          </li>
          <li className="flex">
            <Check color="green" />
            &nbsp;Unlimited storage
          </li>
          <li className="flex">
            <Check color="green" />
            &nbsp;Discord #supporter role
          </li>
          <li className="flex">
            <Check color="green" />
            &nbsp;Priority Support
          </li>
        </ul>
        <div className="mt-8">
          <PayModal />
        </div>
      </div>
    </>
  );
}
