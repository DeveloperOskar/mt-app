import { createUploadthing, type FileRouter } from "uploadthing/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions, getServerAuthSession } from "~/server/auth";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req, res }) => {
      const session = await getServerAuthSession();
      // const session = await getServerSession(req, res, authOptions);

      if (!session?.user) throw new Error("Unauthorized");

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type MtFileRouter = typeof fileRouter;
