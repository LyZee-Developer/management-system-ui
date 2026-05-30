import cuteCat from "../../public/gif/cute-cat.gif";
import hiRemove from "../../public/gif/hi-remove.gif";
import kawaii from "../../public/gif/kawaii-kitty.gif";
import miko from "../../public/gif/miko.gif";
import Compressor from "compressorjs";
import defaultImage from '../../public/image/default-user.avif';
import { ToastUtil } from "./ToastUtil";
const image: string[] = [cuteCat, hiRemove, kawaii, miko];

export const ImageUtil = () => {
  const toast = ToastUtil();
  const randomImage = (): string => {
    let radomIndex = Math.floor(Math.random() * image.length);
    return image[radomIndex];
  };

  const Compress = async (file: File, quality = 0.4): Promise<any> => {
    if(file.size >= 5000000) {
      toast.show("Your size image is too large.", "error");
      return ""
    }
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality,
        maxWidth: 500,
        maxHeight: 500,
        convertSize: 500000,

        success(result) {
          console.log("Original:", (file.size / 1024).toFixed(2), "KB");
          console.log("Compressed:", (result.size / 1024).toFixed(2), "KB");
          const compressedFile = new File([result], file.name, {
            type: result.type,
          });

          resolve(compressedFile);
        },

        error: reject,
      });
    });
  };

  return {
    randomImage,
    Compress,
    defaultImage
  };
};
