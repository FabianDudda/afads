import { readFileSync } from "fs";
import { resolve } from "path";

export default {
  load() {
    const manifest = JSON.parse(
      readFileSync(
        resolve(__dirname, "../../packages/components/dist/custom-elements.json"),
        "utf-8",
      ),
    );

    return manifest;
  },
};
