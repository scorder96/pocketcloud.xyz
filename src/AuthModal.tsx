import { Dialog } from "@/components/ui/dialog";
import Signup from "./Signup";
import Login from "./Login";
import Verify from "./Verify";
interface Props {
  authState: number;
  onChangeAuthState: (state: number) => void;
}
export default function AuthModal({ authState, onChangeAuthState }: Props) {
  return (
    <Dialog open={authState > 0}>
      {authState == 1 && (
        <Signup
          onLogin={() => onChangeAuthState(2)}
          onContinueToVerify={() => onChangeAuthState(3)}
        />
      )}
      {authState == 2 && (
        <Login
          onSignup={() => onChangeAuthState(1)}
          onClose={() => onChangeAuthState(0)}
        />
      )}
      {authState == 3 && <Verify onClose={() => onChangeAuthState(0)} />}
    </Dialog>
  );
}
