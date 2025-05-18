"use server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

type State = {
    error?: string | undefined,
    success: boolean
}

export async function addPostAction(_: State, formData: FormData): Promise<State> {
    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                error: "ユーザーが存在しません",
                success: false
            };
        }
        const postText = formData.get('post') as string;
        const postTextSchema = z.string().min(1, "1文字以上で入力してください").max(140, "140文字以内で入力してください");
        const validatedPostText = postTextSchema.parse(postText);

        await prisma.post.create({
            data: {
                content: validatedPostText,
                authorId: userId
            }
        });

        return {
            error: undefined,
            success: true
        }
    } catch (err) {
        if (err instanceof z.ZodError) {
            return {
                error: err.errors.map((e) => e.message).join(","),
                success: false
            }
        } else if (err instanceof Error) {
            return {
                error: err.message,
                success: false
            }
        }
        return {
            error: "不明なエラーが発生しました",
            success: false
        };
    }
}
