import cuteCat from "../../public/gif/cute-cat.gif";
import hiRemove from "../../public/gif/hi-remove.gif";
import kawaii from "../../public/gif/kawaii-kitty.gif";
import miko from "../../public/gif/miko.gif";
const image: string[] = [cuteCat, hiRemove, kawaii, miko];

export const ImageUtil = () => {
  const randomImage = (): string => {
    let radomIndex = Math.floor(Math.random() * image.length);
    return image[radomIndex];
  };

  return {
    randomImage,
  };
};
