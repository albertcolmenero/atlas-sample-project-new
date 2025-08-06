import { AtlasNextServerClient } from "@runonatlas/next/server";
import { auth } from "@clerk/nextjs/server";

export const atlasServerClient = new AtlasNextServerClient(
  async () => {
    const { userId } = await auth();
    return userId;
  }
);