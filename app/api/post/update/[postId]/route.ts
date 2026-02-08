import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { updatePostSchema } from "@/schema/updatePostSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Props {
  params: { postId: string };
}

export async function POST(request: Request, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const parsed = updatePostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(parsed.error.format(), { status: 400 });
    }

    const { title, description, links, tags } = parsed.data;
    const { postId } = params;

    const existingPost = await db.post.findFirst({
      where: {
        id: postId,
        userId: session.user.id,
      },
    });

    if (!existingPost) {
      return NextResponse.json("Post not found or access denied", {
        status: 404,
      });
    }

    const tagRecords = tags
      ? await Promise.all(
          tags.map((tag) =>
            db.tag.upsert({
              where: { name: tag },
              update: {},
              create: { name: tag },
            })
          )
        )
      : [];

    const updatedPost = await db.post.update({
      where: { id: postId },
      data: {
        title,
        description,
        links,
        tags: {
          deleteMany: {},
          create: tagRecords.map((tag) => ({
            tagId: tag.id,
          })),
        },
      },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
