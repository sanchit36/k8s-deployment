import TodoDetails from "@/components/TodoDetails";
import { Suspense } from "react";

const TodoDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Todo Details</h1>

        <Suspense fallback="Loading...">
          <TodoDetails params={params} />
        </Suspense>
      </main>
    </div>
  );
};

export default TodoDetailsPage;
