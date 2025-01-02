import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./components/ui/button";
import { UploadIcon } from "lucide-react";
import { Input } from "./components/ui/input";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import pb from "./pocketbase";

interface Props {
  instanceid: string;
}
var filenames: Array<string> = [];
var filesizes: Array<number> = [];
export default function HooksUploadDialog({ instanceid }: Props) {
  const [Files, setFiles] = useState(Array<File>);
  const [FileNames, setFileNames] = useState(Array<string>);
  const [EnableUpload, setEnableUpload] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [FileSizes, setFileSizes] = useState(Array<number>);
  const params = useParams();

  async function selectForUpload(e: React.ChangeEvent<HTMLInputElement>) {
    var toolarge = false;
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      selectedFiles.forEach((file) => {
        const pathParts = file.webkitRelativePath.split("/");
        const modifiedPath = pathParts.slice(1).join("/");
        filenames = [...filenames, modifiedPath];
        setFileNames(filenames);
        const fileSizeInBytes = file.size; // File size in bytes
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert to MB
        if (fileSizeInMB > 200) {
          toolarge = true;
        }
        filesizes = [...filesizes, fileSizeInMB];
        setFileSizes(filesizes);
      });
    }
    filenames = [];
    filesizes = [];
    setEnableUpload(!toolarge);
  }
  function jsonBuilder(filestructure: Array<string>) {
    var listStructure: Array<String> = [];
    filestructure.forEach((file) => {
      listStructure.push(file);
    });
    const jsonstructure = JSON.stringify(listStructure);
    return jsonstructure;
  }
  async function uploadConfirm() {
    setLoading(true);
    const jsonOutput = jsonBuilder(FileNames);
    const data = {
      instance: instanceid,
      files: jsonOutput,
    };
    const record = await pb
      .collection("user_hooks")
      .create(data)
      .catch((err) => console.log(err));
    if (record) {
      const formData = new FormData();
      Files.forEach((file) => {
        formData.append("files", file);
      });
      await fetch(import.meta.env.VITE_API_URL + "hooks/" + params.id, {
        method: "POST",
        body: formData,
      })
        .then(() => alert("Your hooks are updated!"))
        .catch((err) => console.log(err));
    }
    setLoading(false);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <UploadIcon size={16} className="me-2" />
          pb_hooks
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload pb_hooks</DialogTitle>
          <DialogDescription>Upload your pb_hooks directory.</DialogDescription>
        </DialogHeader>
        <Input
          type="file"
          onChange={selectForUpload}
          /* @ts-expect-error */
          webkitdirectory="true"
          multiple
        />
        <ul>
          {FileNames.map((file, index) => {
            return (
              index < 5 && (
                <li key={index}>
                  {file}{" "}
                  {FileSizes[index] > 200 && <b className="text-red-500">Too large</b>}
                </li>
              )
            );
          })}
        </ul>
        {FileNames.length > 5 && <b>And {FileNames.length - 5} more</b>}
        <DialogFooter>
          {EnableUpload && (
            <Button onClick={uploadConfirm} disabled={Loading}>
              Upload
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
