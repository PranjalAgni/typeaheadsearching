import { SearchData } from "../interfaces";
import { getContentsWithinDirectory, isBlackListed } from "../utils/files";

export const scrapeData = async (): Promise<SearchData[]> => {
  const data: SearchData[] = [];
  console.log("Building trie: ", process.env.LEETCODE_DIRECTORY);
  const contents = await getContentsWithinDirectory(
    process.env.LEETCODE_DIRECTORY!
  );

  const required = contents.filter((content) => !isBlackListed(content));

  for (let idx = 0; idx < required.length; idx++) {
    const category = required[idx];
    const categoryPath = `${process.env.LEETCODE_DIRECTORY}/${category}`;
    const files = await getContentsWithinDirectory(categoryPath);
    files.forEach((file) => {
      const name = file.replace(/-/g, " ");
      data.push({ name, tag: category });
    });
  }

  return data;
};
