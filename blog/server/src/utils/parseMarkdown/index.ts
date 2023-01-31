import fs from "node:fs";
import matter from "gray-matter";
import shiki from "shiki";
import { marked } from "marked";

import markedKatexExtension from "./markedKatexExtension.js";

export default async function parseMarkdown<Meta extends Record<string, unknown>>(
  markdownFilePath: string
) {
  const fileData = fs.readFileSync(markdownFilePath, {
    encoding: "utf-8",
  });

  const highlighter = await shiki.getHighlighter({
    theme: "nord",
  });

  let { data, content } = matter(fileData);
  marked.setOptions({
    highlight: function (code, lang) {
      return highlighter.codeToHtml(code, { lang });
    },
  });
  marked.use(markedKatexExtension());
  content = marked.parse(content);

  return {
    meta: data as Meta,
    content,
  };
}
