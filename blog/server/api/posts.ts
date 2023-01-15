import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { getPostsPath, formatDate } from "~~/server/utils";

interface PostListItem {
  filename: string;
  title: string;
  date: string;
  tags: string[] | null;
}

export default defineEventHandler((event) => {
  const postsPath = getPostsPath();
  const postListData: PostListItem[] = [];
  const posts = fs.readdirSync(postsPath).reverse();
  const total = posts.length >= 10 ? 10 : posts.length;

  for (let i = 0; i < total; i++) {
    const postsDirPath = getPostsPath();
    const postFileName = posts[i];
    const filePath = path.join(postsDirPath, postFileName);
    const content = fs.readFileSync(filePath, {
      encoding: "utf-8",
    });
    const { data } = matter(content);
    postListData.push({
      ...data,
      filename: postFileName,
      date: formatDate(data.date),
    } as PostListItem);
  }

  return {
    list: postListData,
  };
});
