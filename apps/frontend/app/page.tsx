import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <TodoForm />

        <Suspense fallback={"Loading..."}>
          <TodoList />
        </Suspense>
      </main>
    </div>
  );
}
