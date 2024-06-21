import { SearchData } from "../interfaces";
import { isBlackListed, parseLeetcodeDirectory } from "../utils/files";

export const scrapeData = async (): Promise<SearchData[]> => {
  const data: SearchData[] = [];
  console.log("Scraping: ", process.env.LEETCODE_DIRECTORY);
  const contents = await parseLeetcodeDirectory(
    process.env.LEETCODE_DIRECTORY!
  );

  const required = contents.filter((content) => !isBlackListed(content));

  required.forEach((file) => {
    data.push({ name: file, tag: file });
  });

  return data;
};
