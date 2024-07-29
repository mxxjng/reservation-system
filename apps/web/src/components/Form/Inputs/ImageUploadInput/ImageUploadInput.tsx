import { useFormContext } from "react-hook-form";
import { ImageUpload } from "~/components/ImageUpload/ImageUpload";
import { DefaultFormInputProps } from "~/types/form";

type ImageUploadInputProps<Model extends Record<string, any>> = {
  /** To show a disabled overlay to prevent interaction with the component */
  disabled?: boolean;
  /** To show the upload component in an error state */
  error?: boolean;
  /** Height of the image */
  height: number;
  /** Blurhash of the previously uploaded image */
  imageHash?: string;
  /** To show the red asterisk next to the label or not */
  imageRequired?: boolean;
  /** ImageKit path of the previously uploaded image or temporary path of the image to be uploaded */
  imageUrl?: string;
  width: number;
} & DefaultFormInputProps<Model>;

function ImageUploadInput<Model extends Record<string, any>>({
  name,
  defaultValue,
  ...props
}: ImageUploadInputProps<Model>) {
  const { setValue, watch } = useFormContext();

  // watch the image path value and set it to the upload component (if image url exists it will be added in the default values)
  const imageUrl = watch(name as string)?.imagePath;

  return (
    <>
      <ImageUpload
        {...props}
        imageUrl={imageUrl}
        onImageCrop={(imageBase64, imagePath) =>
          setValue(
            name as string,
            { imageBase64, imagePath },
            { shouldDirty: true }
          )
        }
        onImageDeleteClick={() =>
          setValue(
            name as string,
            { imageBase64: "", imagePath: "" },
            { shouldDirty: true }
          )
        }
      />
    </>
  );
}

export default ImageUploadInput;
