import { updateTag } from "next/cache";

const TodoForm = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const formValues = {
      title: formData.get("title"),
    };

    const response = await fetch(`${process.env.APP_URL}/todos`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      updateTag("todos");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 border w-full p-4 rounded-md"
      action={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          className="border p-2 rounded-md"
          id="title"
          type="text"
          name="title"
          placeholder="Enter Title"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white dark:bg-white dark:text-black p-2"
      >
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
