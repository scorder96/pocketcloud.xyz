import Codeblock from "@/Codeblock";
import Navbar from "@/Navbar";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SettingUp() {
  useEffect(() => {
    document.title = "Setting up your project with PocketCloud";
  }, []);
  const code2 = `import PocketBase from 'pocketbase';
const pb = new PocketBase('https://xxxxx.pocketcloud.xyz');`;
  const code3 = `const records = await pb.collection('users').getFullList({
    sort: '-created',
});`;
  return (
    <>
      <Navbar />
      <div className="px-24">
        <h1 className="text-4xl py-16 font-bold">
          Setting up your project with PocketCloud
        </h1>
        <p className="pb-8">
          This tutorial will walk you through setting up PocketCloud to get started with
          using hosted PocketBase in your project.
        </p>
        {/* <h3 className="text-lg mb-4 font-semibold">Installing PocketBase</h3> */}
        <h2 className="text-lg font-semibold mb-8">Deploying</h2>
        <p className="pb-8">
          Go to{" "}
          <Link to={"https://pocketcloud.xyz"} target="_blank" className="underline">
            pocketcloud.xyz
          </Link>{" "}
          and click on <b>Deploy</b> to power up a new instance. You will be asked to
          create an account if you don't have one already or aren't logged in.
        </p>
        <p className="pb-8">
          Once deployed, you should see the new instance on your Dashboard.
        </p>
        <p className="pb-8">
          Click on the link mentioned at the top of the Dashboard. This will take you to
          the Admin UI. You will need to sign up to access the Admin panel of PocketBase.
        </p>
        <p className="pb-8">
          Now you have a PocketBase instance running on the cloud, ready to connect with
          your frontend.
        </p>
        <h2 className="text-lg font-semibold mb-8">Connecting</h2>
        <p className="pb-8">Install the PocketBase NPM package.</p>
        <Codeblock code="npm i pocketbase" />
        {/* <h3 className="text-lg mb-4 mt-8 font-semibold">Initializing</h3> */}
        {/* <code className="text-sm">pocketbase.ts/js</code> */}
        <p className="py-8">
          The following code connects your application to the instance we deployed
          earlier. Replace <b>xxxxx</b> with your unique instance ID.
        </p>
        <Codeblock code={code2} />
        {/* <h3 className="text-lg mb-4 mt-8 font-semibold">Querying</h3> */}
        {/* <code className="text-sm">app.ts/js</code> */}
        <p className="py-8">
          You can now start querying the database via the{" "}
          <Link
            to={"https://pocketbase.io/docs/api-records/"}
            target="_blank"
            className="underline"
          >
            PocketBase API
          </Link>
          .
        </p>
        <Codeblock code={code3} />
        <p className="py-16 text-center">
          <i>PocketCloud</i>
        </p>
      </div>
    </>
  );
}
