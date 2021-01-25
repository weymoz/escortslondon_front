import path from "path";
import ImageEditor from "./ImageEditor";

const imageEditor = new ImageEditor(
  path.join(process.cwd(), "functions/blog-demo-10.jpg")
);

(async () => {
  await imageEditor.init();
  imageEditor.addWatermark();
  imageEditor.saveImage(
    "/Users/mac/Projects/elondon-ssr/functions/wm-test.jpg"
  );
})();
