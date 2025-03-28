// collections/Media.ts
import { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
  },
  fields: [
    // You can add additional fields here if needed
  ],
};