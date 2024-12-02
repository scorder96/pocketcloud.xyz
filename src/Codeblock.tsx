import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button";

interface Props {
  code: string;
}
export default function Codeblock({ code }: Props) {
  const [Copied, setCopied] = useState(false);
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
  async function handleCopy() {
    navigator.clipboard.writeText(code?.toString()!);
    setCopied(true);
    await timeout(1000);
    setCopied(false);
  }
  return (
    <div className="flex items-center space-x-2">
      <code className="bg-zinc-200 dark:bg-zinc-800 p-4">
        <pre>{code}</pre>
      </code>
      <Button variant={"ghost"} onClick={handleCopy}>
        {Copied ? (
          <CopyCheck color="green" strokeWidth={1} />
        ) : (
          <Copy strokeWidth={1} />
        )}
      </Button>
    </div>
  );
}
