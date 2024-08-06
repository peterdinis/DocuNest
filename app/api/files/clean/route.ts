import { UTApi } from "uploadthing/server";

export async function DELETE(request: Request) {
    const data = await request.json();
    const newUrl = data.url.substring(data.url.lastIndexOf("/") + 1);
    const utapi = new UTApi();
    await utapi.deleteFiles(newUrl);
  
    return Response.json({ message: "ok" });
  }