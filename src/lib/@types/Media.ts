import { z } from "zod";

export const TagEnum = z.enum(["Hardsub", "Dubbed", "WebDl", "BluRay", "CAM"]);

export const QualityTypeEnum = z.enum(["WebDl", "BluRay", "CAM"]);
