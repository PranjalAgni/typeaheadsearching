import fs from "fs/promises";
import path from "path";

export const isBlackListed = (filename: string) => {
  return filename.startsWith(".") || filename.endsWith(".md");
};

export const parseLeetcodeDirectory = async (leetcodeDirectory: string) => {
  const allDirectory = await fs.readdir(path.resolve(leetcodeDirectory));
  return allDirectory;
};
