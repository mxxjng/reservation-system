import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/form";
import { type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";
import { testFormSchema, TestFormSchema } from "@repo/validators";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit: SubmitHandler<TestFormSchema> = (data) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      toast.success(`Name: ${data.name}`);
    }, 3000);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline mb-4">Vite + React</h1>
      <div className="max-w-sm">
        <Form<TestFormSchema, typeof testFormSchema>
          onSubmit={handleSubmit}
          schema={testFormSchema}
        >
          <Form.StringInput<TestFormSchema> id="name" name="name" className="mb-2" />
          <Button disabled={loading} type="submit">
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Home;
