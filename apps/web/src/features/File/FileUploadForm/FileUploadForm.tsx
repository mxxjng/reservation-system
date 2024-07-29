import { Button } from "@mantine/core";
import { SubmitHandler } from "react-hook-form";
import { Form } from "~/components/Form/Form";

import { FileSchema, TFile } from "~/types/file";

type FileUploadFormProps = {
  /* optional default values for the form */
  defaultValues?: Partial<{ file: Record<string, any> }> | undefined;

  /* function to execute when the form is submitted */
  onSubmit: SubmitHandler<TFile>;

  /* check if the form is submitting */
  isLoading?: boolean;

  /* to check if the form is in edit or create mode */
  isEdit?: boolean;
};

const FileUploadForm = ({ defaultValues, onSubmit, isLoading, isEdit }: FileUploadFormProps) => {
  return (
    <Form<TFile, typeof FileSchema>
      onSubmit={onSubmit}
      schema={FileSchema}
      defaultValues={defaultValues}
      key="file-form"
    >
      <Form.FileInput<TFile> name="file" label="File" clearable />
      <Button type="submit" loading={isLoading} mb="md">
        {isEdit ? "Update" : "Create"}
      </Button>
    </Form>
  );
};
export default FileUploadForm;
