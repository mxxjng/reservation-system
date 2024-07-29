import { useCallback, useState } from "react";

import {
  ActionIcon,
  Box,
  Group,
  Image as MantineImage,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import imageCompression from "browser-image-compression";
import { useTranslations } from "next-intl";

import { IconPhoto, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import ImageKitImage from "../ImageKitImage/ImageKitImage";
import { CropModal } from "./CropModal";
import { toBase64 } from "./helper";

export interface ImageUploadProps {
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
  /** Callback to be fired when a new image is uploaded */
  onImageCrop: (imageBase64: string, imagePath: string) => void;
  /** Callback to be fired when the image is deleted */
  onImageDeleteClick: () => void;
  /** Width of the image */
  width: number;
}

/** Image dropzone component to allow users to upload image within forms */
/* image gets encoded to base64 and gets send as base 64 string to the backend */
export const ImageUpload = ({
  imageUrl,
  imageHash,
  height,
  width,
  imageRequired,
  disabled,
  onImageCrop,
  onImageDeleteClick,
}: ImageUploadProps) => {
  const theme = useMantineTheme();
  const [imageCropModalOpen, setImageCropModalOpen] = useState(false);
  const [newUploadedImageUrl, setNewUploadedImageUrl] = useState("");
  const t = useTranslations("dashboard.imageUpload");

  // creates a base64 string from a blob and sets it to the onImageCrop callback
  const onCropComplete = useCallback(
    async (croppedImageBlob: Blob) => {
      setImageCropModalOpen(false);
      setNewUploadedImageUrl("");

      const compressedFile = await imageCompression(
        new File([croppedImageBlob], "image.jpeg", {
          type: croppedImageBlob.type,
        }),
        { initialQuality: 0.75, maxWidthOrHeight: width, useWebWorker: true }
      );
      const base64File = await toBase64(compressedFile);
      onImageCrop(base64File as string, URL.createObjectURL(compressedFile));
    },
    [width, onImageCrop, setImageCropModalOpen]
  );

  return (
    <>
      <Box style={{ position: "relative" }}>
        {disabled && (
          <Box
            bg={theme.white}
            h="100%"
            opacity={0.3}
            pos="absolute"
            w="100%"
          />
        )}
        {imageUrl ? (
          <Box
            style={{ borderRadius: 8, overflow: "hidden", display: "block" }}
          >
            {imageUrl?.startsWith("blob") ? (
              <MantineImage fit="cover" src={imageUrl} />
            ) : (
              <ImageKitImage
                blurhash={imageHash}
                height={height}
                imagePath={imageUrl}
                width={width}
              />
            )}

            <ActionIcon
              disabled={disabled}
              onClick={onImageDeleteClick}
              variant="default"
              opacity={disabled ? 0.6 : 1}
              style={{ position: "absolute", right: 5, top: 5 }}
            >
              <IconTrash size="1rem" stroke={1.5} />
            </ActionIcon>
          </Box>
        ) : (
          <Dropzone
            accept={[MIME_TYPES.jpeg]}
            data-testid="image-upload-dropzone"
            disabled={disabled}
            multiple={false}
            radius="md"
            onDrop={(files) => {
              if (files[0]) {
                setImageCropModalOpen(true);
                setNewUploadedImageUrl(URL.createObjectURL(files[0]));
              }
            }}
          >
            <Group
              justify="center"
              gap="xl"
              mih={100}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="sm" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="xs" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
      </Box>
      <CropModal
        aspect={width / height}
        imageUrl={newUploadedImageUrl}
        onClose={() => setImageCropModalOpen(false)}
        onCrop={onCropComplete}
        opened={imageCropModalOpen}
      />
    </>
  );
};
