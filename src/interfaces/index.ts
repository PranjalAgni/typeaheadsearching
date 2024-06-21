import { TrieNode } from "../services/search";

export interface SearchData {
  name: string;
  tag: string;
}

export interface SearchSuggestionData {
  node: TrieNode;
  prefix: string;
}
