import { generateComponents } from "@uploadthing/react";
import { MtFileRouter } from "~/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react/hooks";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<MtFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<MtFileRouter>();
