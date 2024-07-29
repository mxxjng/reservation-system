import { useCallback, useState } from "react";

import { Box, Button, Group, Slider, Stack, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Cropper from "react-easy-crop";

import type { ModalProps } from "@mantine/core";
import type { Area, Point } from "react-easy-crop";

import { Modal } from "../Modal/Modal";
import { getCroppedImg } from "./helper";

interface Props extends ModalProps {
  /** Aspect ratio to be used when cropping */
  aspect?: number;
  /** Path of the image to be cropped */
  imageUrl: string;
  /** Callback to be fired once cropping is complete */
  onCrop: (imageBlob: Blob) => void;
}

/** Modal to allow the user to zoom & crop the uploading image into appropriate aspect ratio */
export const CropModal = ({
  imageUrl,
  onCrop,
  aspect = 1,
  onClose,
  ...rest
}: Props) => {
  //const { classes, theme } = useStyles();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const t = useTranslations("dashboard.imageUpload");
  const tCommon = useTranslations("common");

  const { mutate, isLoading: cropping } = useMutation(getCroppedImg, {
    mutationKey: [],
    onSuccess: (croppedImage) => {
      if (croppedImage) {
        onCrop(croppedImage);
      }
    },
  });

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const finishCropImage = useCallback(async () => {
    if (croppedAreaPixels) {
      mutate({ imageSrc: imageUrl, pixelCrop: croppedAreaPixels, rotation });
    }
  }, [croppedAreaPixels, rotation, imageUrl, onCrop]);

  return (
    <Modal
      centered
      loading={cropping}
      onClose={onClose}
      size="lg"
      radius="md"
      title={t("cropModalTitle")}
      {...rest}
    >
      <Stack>
        <Box
          style={{
            height: 400,
            position: "relative",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Cropper
            aspect={aspect}
            crop={crop}
            image={imageUrl}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onRotationChange={setRotation}
            onZoomChange={setZoom}
            rotation={rotation}
            zoom={zoom}
          />
        </Box>
        <Box>
          <Text>{t("zoom")}</Text>
          <Slider
            label={t("zoom")}
            max={3}
            min={1}
            onChange={setZoom}
            step={0.1}
            value={zoom}
          />
        </Box>
        <Box>
          <Text>{t("rotation")}</Text>
          <Slider
            label={t("rotation")}
            max={360}
            min={0}
            onChange={setRotation}
            step={1}
            value={rotation}
          />
        </Box>
      </Stack>

      <Group mt="md">
        <Button disabled={cropping} onClick={onClose} variant="subtle">
          {tCommon("cancel")}
        </Button>
        <Button
          data-testid="crop-image"
          loading={cropping}
          onClick={finishCropImage}
        >
          {t("crop")}
        </Button>
      </Group>
    </Modal>
  );
};
