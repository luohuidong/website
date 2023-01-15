import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import matter from "gray-matter";

import { getPostsPath, formatDate } from "~~/server/utils";

export default defineEventHandler((event) => {
  const postname = event.context.params.name;
  const postsPath = getPostsPath();
  const fileData = fs.readFileSync(path.join(postsPath, postname), {
    encoding: "utf-8",
  });

  let { data, content } = matter(fileData);
  content = marked.parse(content);

  return {
    title: data.title as string,
    date: formatDate(data.date),
    content,
  };
});
