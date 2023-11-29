import { generateComponents } from "@uploadthing/react";
import { MtFileRouter } from "~/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<MtFileRouter>();
