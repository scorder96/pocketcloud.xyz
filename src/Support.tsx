import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import Navbar from "./Navbar";
import pb from "./pocketbase";
import AuthModal from "./AuthModal";

export default function Support() {
  useEffect(() => {
    document.title = "PocketCloud - Support";
    !pb.authStore.isValid && setAuthState(2);
  }, []);
  const [Message, setMessage] = useState(String);
  const [Loading, setLoading] = useState(false);
  const [AuthState, setAuthState] = useState(0);
  const [Done, setDone] = useState(false);
  async function onSubmit() {
    setLoading(true);
    const data = {
      user: pb.authStore.model?.id,
      message: Message,
    };
    await pb.collection("support").create(data);
    setLoading(false);
    setDone(true);
  }
  return (
    <>
      <AuthModal authState={AuthState} onChangeAuthState={setAuthState} />
      <Navbar />
      <div className="px-32 pt-16">
        <h1 className="text-xl">PocketCloud Support 🎧</h1>
        {Done ? (
          <p className="mt-8">Your message was received</p>
        ) : (
          <div>
            <Textarea
              className="mt-8"
              placeholder="Enter your question or grievance here"
              onChange={(e) => setMessage(e.target.value)}
              value={Message}
            ></Textarea>
            <Button className="mt-8" onClick={onSubmit} disabled={Loading}>
              Submit
            </Button>
          </div>
        )}
        <p className="mt-8">You will receive an email response in less than 24 hours</p>
      </div>
    </>
  );
}
