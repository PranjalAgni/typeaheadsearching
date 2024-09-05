import fs from "fs/promises";

export const isBlackListed = (filename: string) => {
  return filename.startsWith(".") || filename.endsWith(".md");
};

export const getContentsWithinDirectory = async (directory: string) => {
  const contents = await fs.readdir(directory);
  return contents;
};
