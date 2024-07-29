import { Box } from "@mantine/core";
import { Blurhash } from "react-blurhash";

interface Props {
  /** Blurhash string used to generate the blurred image before the actual image loads */
  blurhash?: string;
  /** Background color to be displayed before js hydration of if blurhash is not available */
  color?: string;
  /** Height of the image */
  height: number;
  /** Alt text of the image */
  imageAlt?: string;
  /** Path of the image which will be appended to imageKit base url */
  imagePath?: string;
  /** Width of the image */
  width: number;
}

/** Optimized image component to display images stored in imageKit. */
const ImageKitImage = ({ blurhash, color, imagePath, imageAlt, height, width }: Props) => {
  return (
    <Box bg={color} h="100%" w="100%">
      {blurhash && (
        <Blurhash
          hash={blurhash}
          height="100%"
          punch={1}
          resolutionX={32}
          resolutionY={32}
          width="100%"
        />
      )}
      {imagePath && (
        <div>
          <img alt="lorem" height={height} src={imagePath} width={width} />
        </div>
      )}
    </Box>
  );
};
export default ImageKitImage;
