import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import matter from "gray-matter";
import shiki from "shiki";

import { getPostsPath, formatDate } from "~~/server/utils";

export default defineEventHandler(async (event) => {
  const postname = event.context.params.name;
  const postsPath = getPostsPath();
  const fileData = fs.readFileSync(path.join(postsPath, postname), {
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
  content = marked.parse(content);

  return {
    title: data.title as string,
    date: formatDate(data.date),
    content,
  };
});
