import { z } from "zod";

export const TagEnum = z.enum([
  "Hardsub",
  "Softsub",
  "Dubbed",
  "WebDl",
  "BluRay",
  "CAM",
]);
