import { SearchSuggestionData } from "../interfaces";

export class TrieNode {
  public children: Map<string, TrieNode>;
  public isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  public insert(word: string) {
    let node = this.root;
    for (let idx = 0; idx < word.length; idx++) {
      let char = word[idx];
      if (!node.children.has(char)) {
        const newNode = new TrieNode();
        node.children.set(char, newNode);
      }

      node = node.children.get(char)!;
    }

    node.isEndOfWord = true;
  }

  public search(word: string) {
    let node = this.root;
    for (let idx = 0; idx < word.length; idx++) {
      const char = word[idx];
      if (!node.children.has(char)) {
        return false;
      }

      node = node.children.get(char)!;
    }

    return node.isEndOfWord;
  }

  public startsWith(prefix: string) {
    let node = this.root;
    for (let idx = 0; idx < prefix.length; idx++) {
      const char = prefix[idx];
      if (!node.children.has(char)) {
        return false;
      }
    }

    return true;
  }

  public getSuggestions(query: string) {
    let node = this.root;
    const suggestions: string[] = [];
    for (let idx = 0; idx < query.length; idx++) {
      const char = query[idx];
      if (!node.children.has(char)) {
        return [];
      }

      node = node.children.get(char)!;
    }

    if (node.isEndOfWord) {
      suggestions.push(query);
    }

    const queue: SearchSuggestionData[] = [];
    queue.push({ node, prefix: query });

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.node.isEndOfWord) {
        suggestions.push(current.prefix);
      }

      for (const [key, value] of current.node.children) {
        queue.push({ node: value, prefix: current.prefix + key });
      }
    }

    return suggestions;
  }
}

export default new Trie();
