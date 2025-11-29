"use server";
import { cacheLife, cacheTag, updateTag } from "next/cache";

export async function getTodo(id: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`todo:${id}`);
  const todoResponse = await fetch(`${process.env.API_URL}/todo/${id}`);
  if (!todoResponse.ok) {
    return { success: false };
  }
  return await todoResponse.json();
}

export const toggleCompleteStatus = async (id: number) => {
  const todoResponse = await fetch(`${process.env.API_URL}/todo/${id}/toggle`, {
    method: "PATCH",
  });
  if (!todoResponse.ok) {
    return { success: false };
  }
  updateTag(`todo:${id}`);
  updateTag("todos");
  return await todoResponse.json();
};
