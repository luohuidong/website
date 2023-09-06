import fs from "node:fs";
import matter from "gray-matter";
import shiki from "shiki";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";

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

  const marked = new Marked(
    markedHighlight({
      highlight: function (code, lang) {
        return highlighter.codeToHtml(code, { lang });
      },
    })
  );
  marked.use(markedKatexExtension());
  content = await marked.parse(content);

  return {
    meta: data as Meta,
    content,
  };
}
